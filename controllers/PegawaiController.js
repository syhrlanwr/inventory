const paginate = require('express-paginate');
const Pegawai = require('../models/Pegawai');

async function managePegawai(req, res) {
    paginate.middleware(10, 50);
    Pegawai.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaPegawai', {
            title: 'Kelola Pegawai',
            pegawai: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}

async function addPegawai(req, res) {
    try {
        const rak = await Pegawai.create(req.body);
        req.flash('success', 'Pegawai berhasil ditambahkan');
        res.redirect('/pegawai');
    } catch (error) {
        console.log(error);
        res.redirect('/pegawai');
    }
}

async function addPegawaiView(req, res) {
    res.render('addPegawai', { title: 'Tambah Pegawai' });
}

async function editPegawaiView(req, res) {
    const { id } = req.params;
    const pegawai = await Pegawai.findOne({
        where: {
            id: id
        }
    });
    res.render('editPegawai', { title: 'Edit Pegawai', pegawai: pegawai });
}

async function editPegawai(req, res) {
    const { id } = req.params;
    const { nama, nip } = req.body;
    const pegawai = await Pegawai.findOne({
        where: {
            id: id
        }
    });
    pegawai.nama = nama;
    pegawai.nip = nip;
    await pegawai.save();
    req.flash('success', 'Pegawai berhasil diubah');
    res.redirect('/pegawai');
}

async function deletePegawai(req, res) {
    const { id } = req.params;
    const pegawai = await Pegawai.findOne({
        where: {
            id: id
        }
    });
    await pegawai.destroy();
    req.flash('success', 'Pegawai berhasil dihapus');
    res.redirect('/pegawai');
}

module.exports = {
    addPegawai,
    addPegawaiView,
    managePegawai,
    editPegawai,
    editPegawaiView,
    deletePegawai
    
}