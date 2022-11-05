const BarangKeluar = require('../models/BarangKeluar');
const Barang = require('../models/Barang');
const User = require('../models/Users');
const Pegawai = require('../models/Pegawai');
const Satuan = require('../models/Satuan');
const Laporan = require('../models/Laporan');
const paginate = require('express-paginate');

async function manageBarangKeluar(req, res) {
    paginate.middleware(10, 50);
    BarangKeluar.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip,
        include: [
            {
                model: Barang,
                as: 'barang',
                include: [
                    {
                        model: Satuan,
                        as: 'satuan'
                    },
                ]
            },
            'pegawai',
            'user'
        ]
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaBarangKeluar', {
            title: 'Kelola Barang Keluar',
            barangkeluar: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}

async function addBarangKeluar(req, res) {
    const { jumlah, barang_id, pegawai_id } = req.body;
    try {
        const barang = await Barang.findOne({
            where: {
                id: barang_id
            }
        });
        const barangkeluar = await BarangKeluar.create({
            jumlah,
            barang_id,
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
                id: barang.satuan_id
            }
        });
        const laporan = await Laporan.create({
            nama_barang: barang.nama,
            jumlah : jumlah + ' ' + satuan.nama,
            peminjam: peminjam.nama,
            user: req.user.name,
            tanggal: new Date(),
            keterangan: 'keluar'
        });
        barang.jumlah = barang.jumlah - jumlah;
        barang.save();
        res.redirect('/barang/keluar');
    } catch (error) {
        console.log(error);
    }
}

async function addBarangKeluarView(req, res) {
    const barangs = await Barang.findAll(
        {
            include: [
                'satuan'
            ]
        }
    );
    const pegawais = await Pegawai.findAll();
    res.render('addBarangKeluar', { barangs, pegawais });
}

module.exports = {
    manageBarangKeluar,
    addBarangKeluar,
    addBarangKeluarView
};