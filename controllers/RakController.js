const Rak = require('../models/Rak');
const paginate = require('express-paginate');

async function manageRak(req, res) {
    paginate.middleware(10, 50);
    Rak.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaRak', {
            title: 'Kelola Rak',
            rak: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}

async function addRak(req, res) {
    try {
        const rak = await Rak.create(req.body);
        req.flash('success', 'Rak berhasil ditambahkan');
        res.redirect('/rak');
    } catch (error) {
        console.log(error);
        res.redirect('/rak');
    }
}

async function addRakView(req, res) {
    res.render('addRak', { title: 'Tambah Rak' });
}

async function editRakView(req, res) {
    const { id } = req.params;
    const rak = await Rak.findOne({
        where: {
            id: id
        }
    });
    res.render('editRak', { title: 'Edit Rak', rak: rak });
}

async function editRak(req, res) {
    const { id } = req.params;
    const { nama } = req.body;
    const rak = await Rak.findOne({
        where: {
            id: id
        }
    });
    rak.nama = nama;
    await rak.save();
    req.flash('success', 'Rak berhasil diubah');
    res.redirect('/rak');
}

async function deleteRak(req, res) {
    const { id } = req.params;
    await Rak.destroy({
        where: {
            id: id
        }
    });
    req.flash('success', 'Rak berhasil dihapus');
    res.redirect('/rak');
}



module.exports = {
    addRak,
    addRakView,
    manageRak,
    editRak,
    editRakView,
    deleteRak
}