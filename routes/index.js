const express = require('express');
const router = express.Router();
const passport = require('passport');
const Laporan = require('../models/Laporan');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function isAdmin(req, res, next) {
    if (req.user.username === 'admin') {
        return next();
    }
    res.redirect('/login');
}

router.get('/', isLoggedIn, async (req, res) => {
    const laporan = await Laporan.findAll({
        order: [
            ['tanggal', 'DESC']
        ],
        limit: 6
    });
    res.render('index', { title: 'Dashboard', laporan : laporan });
})

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('login', { title: 'Login'});
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    req.logout( e => {
        if (e) {
            next(e);
        }
        res.redirect('/login');
    });
});

router.get('/laporan', isLoggedIn, async (req, res) => {
    const laporan = await Laporan.findAll();
    res.render('laporan', { title: 'Laporan', laporan : laporan });
})



module.exports = {
    isLoggedIn,
    isAdmin,
    router
}