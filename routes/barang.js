const { manageBarang, addBarang, addBarangView, editBarang, editBarangView, deleteBarang } = require('../controllers/BarangController');
const { manageBarangKeluar, addBarangKeluar, addBarangKeluarView } = require('../controllers/BarangKeluarController');
const { addPengembalianView, addPengembalian, managePengembalian } = require('../controllers/PengembalianController');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./index');

router.get('/add', isLoggedIn, addBarangView);

router.get('/add/pilih', isLoggedIn, (req, res) => {
    res.render('BarangBaruOrPengembalian', {
        title: 'Barang Baru atau Pengembalian'
    });
});


router.post('/add', isLoggedIn, addBarang);

router.get('/', isLoggedIn, manageBarang);

router.get('/keluar', isLoggedIn, manageBarangKeluar);

router.get('/keluar/add', isLoggedIn, addBarangKeluarView);

router.post('/keluar/add', isLoggedIn, addBarangKeluar);

router.get('/pengembalian/add', isLoggedIn, addPengembalianView);

router.post('/pengembalian/add', isLoggedIn, addPengembalian);

router.get('/pengembalian', isLoggedIn, managePengembalian);


module.exports = router;