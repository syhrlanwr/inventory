const { managePegawai, addPegawai, addPegawaiView, editPegawaiView, editPegawai, deletePegawai } = require('../controllers/PegawaiController');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./index');

router.get('/', isLoggedIn, managePegawai);

router.get('/add', isLoggedIn, addPegawaiView);

router.post('/add', isLoggedIn, addPegawai);

router.get('/edit/:id', isLoggedIn, editPegawaiView);

router.post('/edit/:id', isLoggedIn, editPegawai);

router.get('/delete/:id', isLoggedIn, deletePegawai);


module.exports = router;