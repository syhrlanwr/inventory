const express = require('express');
const { register, registerView, manageUsers, editUserView, editUser, deleteUser } = require('../controllers/UserController');
const router = express.Router();
const { body } = require('express-validator');
const Users = require('../models/Users');
const { isLoggedIn, isAdmin } = require('./index');


router.get('/add', isLoggedIn, isAdmin, registerView);

router.get('/', isLoggedIn, isAdmin, manageUsers);

router.post('/add', [
    body('username').custom(value => {
        return Users.findOne({ where: { username: value } }).then(user => {
            if (user) {
                return Promise.reject('Username sudah digunakan');
            }
        });
    }),
    body('username').not().contains(' ').withMessage('Username tidak boleh mengandung spasi'),
    body('password').isLength({ min: 5 }).withMessage('Password minimal 5 karakter'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password tidak sama');
        }
        return true;
    })
], register);

router.get('/edit/:id', isLoggedIn, isAdmin, editUserView);

router.post('/edit/:id', [
    body('username').custom((value, { req }) => {
        return Users.findOne({ where: { username: value } }).then(user => {
            if (user && user.id != req.params.id) {
                return Promise.reject('Username sudah digunakan');
            }
        });
    }),
    body('username').not().contains(' ').withMessage('Username tidak boleh mengandung spasi'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password tidak sama');
        }
        return true;
    })
], editUser);

router.get('/delete/:id', isLoggedIn, isAdmin, deleteUser);



module.exports = router;