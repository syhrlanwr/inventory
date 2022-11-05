const { manageRak, addRak, addRakView, editRakView, editRak, deleteRak } = require('../controllers/RakController');
const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('./index');

router.get('/', isLoggedIn, manageRak);

router.get('/add', isLoggedIn, addRakView);

router.post('/add', isLoggedIn, addRak);

router.get('/edit/:id', isLoggedIn, editRakView);

router.post('/edit/:id', isLoggedIn, editRak);

router.get('/delete/:id', isLoggedIn, deleteRak);


module.exports = router;