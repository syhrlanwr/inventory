const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const paginate = require('express-paginate');
const { validationResult } = require('express-validator');



async function manageUsers(req, res) {
    paginate.middleware(10, 50);
    Users.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaUser', {
            title: 'Kelola User',
            users: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}
    

async function register(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            errors.array().forEach((error) => {
                req.flash('error', error.msg);
            });
            return res.render('addUser', {
                title: 'Tambah User',
                errors: errors.array(),
            });
        }
        const { username, name, password, confirmPassword } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await Users.create({
            username: username,
            password: hashedPassword,
            name: name,
        });
        req.flash('success', 'User berhasil ditambahkan');
        res.redirect('/users');
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
}

async function registerView(req, res) {
    res.render('addUser', { title: 'Tambah User' });
}

async function editUserView(req, res) {
    const { id } = req.params;
    const user = await Users.findOne({
        where: {
            id: id
        }
    });
    res.render('editUser', { title: 'Edit User', user: user });
}

async function editUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        return res.render('editUser', {
            title: 'Edit User',
            errors: errors.array(),
        });
    }
    const { id } = req.params;
    const { username, name, password, confirmPassword } = req.body;
    const user = await Users.findOne({
        where: {
            id: id
        }
    });
    user.username = username;
    user.name = name;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
    }
    await user.save();
    req.flash('success', 'User berhasil diubah');
    res.redirect('/users');
}

async function deleteUser(req, res) {
    const { id } = req.params;
    const user = await Users.findOne({
        where: {
            id: id
        }
    });
    await user.destroy();
    req.flash('success', 'User berhasil dihapus');
    res.redirect('/users');
}


module.exports = {
    register,
    registerView,
    manageUsers,
    editUserView,
    editUser,
    deleteUser
}