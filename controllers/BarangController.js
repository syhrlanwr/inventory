const Barang = require('../models/Barang');
const Jenis = require('../models/Jenis');
const Rak = require('../models/Rak');
const Pegawai = require('../models/Pegawai');
const Satuan = require('../models/Satuan');
const User = require('../models/Users');
const Laporan = require('../models/Laporan');
const paginate = require('express-paginate');

async function manageBarang(req, res) {
    paginate.middleware(10, 50);
    Barang.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip,
        include: [
            'jenis',
            'rak',
            'satuan',
            'pegawai',
            'user'
        ]
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaBarang', {
            title: 'Kelola Barang',
            barang: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}

async function addBarang(req, res) {
    const { nama, jumlah, jenis_id, rak_id, satuan_id, pegawai_id } = req.body;

    try {
        const barang = await Barang.create({
            nama,
            jumlah,
            jenis_id,
            rak_id,
            satuan_id,
            pegawai_id, 
            user_id: req.user.id
        });
        const peminjam = await Pegawai.findOne({
            where: {
                id: pegawai_id
            }
        });
        const satuan = await Satuan.findOne({
            where: {
                id: satuan_id
            }
        });
        
        const laporan = await Laporan.create({
            nama_barang: nama,
            jumlah: jumlah + ' ' + satuan.nama,
            keterangan: 'masuk',
            user : req.user.name,
            peminjam: peminjam.nama,
            tanggal: new Date()
        });

        res.redirect('/barang');
    } catch (error) {
        console.log(error);
    }
}

async function addBarangView(req, res) {
    const jenis = await Jenis.findAll();
    const raks = await Rak.findAll();
    const satuans = await Satuan.findAll();
    const pegawais = await Pegawai.findAll();
    res.render('addBarang', { jenis, raks, satuans, pegawais });
}

async function editBarang(req, res) {
    const { id } = req.params;
    const { nama, jumlah, jenis_id, rak_id, satuan_id, pegawai_id } = req.body;

    try {
        const barang = await Barang.findOne({
            where: {
                id : id
            }
        });
        barang.nama = nama;
        barang.jumlah = jumlah;
        barang.jenis_id = jenis_id;
        barang.rak_id = rak_id;
        barang.satuan_id = satuan_id;
        barang.pegawai_id = pegawai_id;
        barang.user_id = req.user.id;
        await barang.save();
        req.flash('success', 'Barang berhasil diubah');
        res.redirect('/barang');
    } catch (error) {
        console.log(error);
    }
}

async function editBarangView(req, res) {
    const { id } = req.params;

    const barang = await Barang.findOne({
        where: {
            id: id
        },
        include: [
            'jenis',
            'rak',
            'satuan',
            'pegawai',
            'user'
        ]
    });
    const jenis = await Jenis.findAll();
    const raks = await Rak.findAll();
    const satuans = await Satuan.findAll();
    const pegawais = await Pegawai.findAll();
    res.render('editBarang', { barang, jenis, raks, satuans, pegawais });

}

async function deleteBarang(req, res) {
    const { id } = req.params;
    await Barang.destroy({
        where: {
            id: id
        }
    });
    req.flash('success', 'Barang berhasil dihapus');
    res.redirect('/barang');
}
module.exports = {
    manageBarang,
    addBarang,
    addBarangView,
    editBarang,
    editBarangView,
    deleteBarang
}

