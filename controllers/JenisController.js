const Jenis = require('../models/Jenis');
const paginate = require('express-paginate');


async function manageJenis(req, res) {
    paginate.middleware(10, 50);
    Jenis.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaJenis', {
            title: 'Kelola Jenis',
            jenis: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}

async function addJenis(req, res) {
    try {
        const { nama } = req.body;
        const jenis = await Jenis.create({
            nama: nama,
        });
        req.flash('success', 'Jenis Barang berhasil ditambahkan');
        res.redirect('/jenis');
    } catch (error) {
        console.log(error);
        res.redirect('/jenis');
    }
}

async function addJenisView(req, res) {
    res.render('addJenis', { title: 'Tambah Jenis' });
}

async function editJenisView(req, res) {
    const { id } = req.params;
    const jenis = await Jenis.findOne({
        where: {
            id: id
        }
    });
    res.render('editJenis', { title: 'Edit Jenis', jenis: jenis });
}

async function editJenis(req, res) {
    const { id } = req.params;
    const { nama } = req.body;
    const jenis = await Jenis.findOne({
        where: {
            id: id
        }
    });
    jenis.nama = nama;
    await jenis.save();
    req.flash('success', 'Jenis Barang berhasil diubah');
    res.redirect('/jenis');
}

async function deleteJenis(req, res) {
    try {
        const { id } = req.params;
        await Jenis.destroy({
            where: {
                id: id
            }
        });
        req.flash('success', 'Jenis Barang berhasil dihapus');
        res.redirect('/jenis');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Jenis Barang gagal dihapus');
        res.redirect('/jenis');
    }
}

module.exports = {
    addJenis,
    addJenisView,
    manageJenis,
    editJenisView,
    editJenis,
    deleteJenis
}