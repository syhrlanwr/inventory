const { manageJenis, addJenisView, addJenis, editJenisView, editJenis, deleteJenis } = require('../controllers/JenisController');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./index');


router.get('/', isLoggedIn, manageJenis);

router.get('/add', isLoggedIn, addJenisView);

router.post('/add', isLoggedIn, addJenis);

router.get('/edit/:id', isLoggedIn, editJenisView);

router.post('/edit/:id', isLoggedIn, editJenis);

router.get('/delete/:id', isLoggedIn, deleteJenis);





module.exports = router;