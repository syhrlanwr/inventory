const Pengembalian = require('../models/Pengembalian');
const BarangKeluar = require('../models/BarangKeluar');
const Barang = require('../models/Barang');
const Jenis = require('../models/Jenis');
const Rak = require('../models/Rak');
const Satuan = require('../models/Satuan');
const Pegawai = require('../models/Pegawai');
const User = require('../models/Users');
const Laporan = require('../models/Laporan');
const paginate = require('express-paginate');

async function addPengembalian(req, res) {
    try {
        const { tanggal, jumlah, barangkeluar_id } = req.body;
        const pengembalian = await Pengembalian.create({
            tanggal: tanggal,
            jumlah: jumlah,
            barangkeluar_id: barangkeluar_id,
            user_id: req.user.id
        });
        const barangkeluar = await BarangKeluar.findOne({
            where: {
                id: barangkeluar_id
            },
            include: [
                {
                    model: Pegawai,
                    as: 'pegawai'
                }
            ]
        });
        const barang = await Barang.findOne({
            where: {
                id: barangkeluar.barang_id
            },
            include: [
                {
                    model: Satuan,
                    as: 'satuan'
                },
            ]
        });
        const laporan = await Laporan.create({
            nama_barang: barang.nama,
            jumlah : jumlah + ' ' + barang.satuan.nama,
            peminjam: barangkeluar.pegawai.nama,
            user: req.user.name,
            tanggal: new Date(),
            keterangan: 'pinjam'
        });
        
        barang.jumlah = barang.jumlah + jumlah;
        barang.save();
        req.flash('success', 'Pengembalian berhasil ditambahkan');
        res.redirect('/barang/pengembalian');
    } catch (error) {
        console.log(error);
        res.redirect('/barang/pengembalian');
    }
}

async function addPengembalianView(req, res) {
    await BarangKeluar.findAll({
        include: [
            {
                model: Barang,
                as: 'barang',
                include: [
                    {
                        model: Jenis,
                        as: 'jenis'
                    },
                    {
                        model: Rak,
                        as: 'rak'
                    },
                    {
                        model: Satuan,
                        as: 'satuan'
                    },
                ]
            },
            {
                model: User,
                as: 'user'
            },
            {
                model: Pegawai,
                as: 'pegawai'
            }
        ]
    }).then((barangkeluar) => {
        res.render('addPengembalianBarang', { title: 'Tambah Pengembalian', barangkeluar: barangkeluar });
    });
}

async function managePengembalian(req, res) {
    paginate.middleware(10, 50);
    await Pengembalian.findAndCountAll({
        limit: req.query.limit,
        offset: req.skip,
        include: [
            {
                model: BarangKeluar,
                as: 'barangkeluar',
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
                    {
                        model: Pegawai,
                        as: 'pegawai'
                    }
                ]
            },
            {
                model: User,
                as: 'user'
            }
        ]
    }).then((results) => {
        const itemCount = results.count;
        const pageCount = Math.ceil(results.count / req.query.limit);
        res.render('kelolaPengembalian', {
            title: 'Kelola Pengembalian',
            pengembalian: results.rows,
            pageCount,
            itemCount,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        });
    });
}



module.exports = {
    addPengembalian,
    addPengembalianView,
    managePengembalian
};