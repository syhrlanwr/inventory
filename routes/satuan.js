const { manageSatuan, addSatuan, addSatuanView, editSatuanView, editSatuan, deleteSatuan } = require('../controllers/SatuanController');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./index');

router.get('/add', isLoggedIn, addSatuanView);

router.post('/add', isLoggedIn, addSatuan);

router.get('/', isLoggedIn, manageSatuan);

router.get('/edit/:id', isLoggedIn, editSatuanView);

router.post('/edit/:id', isLoggedIn, editSatuan);

router.get('/delete/:id', isLoggedIn, deleteSatuan);

module.exports = router;