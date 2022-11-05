const Satuan = require('../models/Satuan');
const paginate = require('express-paginate');

async function manageSatuan(req, res) {
    paginate.middleware(10, 50);
    Satuan.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaSatuan', {
            title: 'Kelola Satuan',
            satuan: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}

async function addSatuan(req, res) {
    try {
        const satuan = await Satuan.create(req.body);
        req.flash('success', 'Satuan Barang berhasil ditambahkan');
        res.redirect('/satuan');
    } catch (error) {
        console.log(error);
        res.redirect('/satuan');
    }
}

async function addSatuanView(req, res) {
    res.render('addSatuan', { title: 'Tambah Satuan' });
}

async function editSatuanView(req, res) {
    const { id } = req.params;
    const satuan = await Satuan.findOne({
        where: {
            id: id
        }
    });
    res.render('editSatuan', { title: 'Edit Satuan', satuan: satuan });
}

async function editSatuan(req, res) {
    const { id } = req.params;
    const satuan = await Satuan.findOne({
        where: {
            id: id
        }
    });
    satuan.nama = req.body.nama;
    await satuan.save();
    req.flash('success', 'Satuan Barang berhasil diubah');
    res.redirect('/satuan');
}

async function deleteSatuan(req, res) {
    const { id } = req.params;
    await Satuan.destroy({
        where: {
            id: id
        }
    });
    req.flash('success', 'Satuan Barang berhasil dihapus');
    res.redirect('/satuan');
}


module.exports = {
    manageSatuan,
    addSatuan,
    addSatuanView,
    editSatuanView,
    editSatuan,
    deleteSatuan
    
};