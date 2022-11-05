const express = require('express');
const app = express();
const db = require('./config/Database');
const User = require('./models/Users');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const Rak = require('./models/Rak');
const Jenis = require('./models/Jenis');
const Satuan = require('./models/Satuan');
const paginate = require('express-paginate');
const morgan = require('morgan');
const createError = require('http-errors');
const Pegawai = require('./models/Pegawai');
const Barang = require('./models/Barang');
const BarangKeluar = require('./models/BarangKeluar');
const Pengembalian = require('./models/Pengembalian');
const Laporan = require('./models/Laporan');
const port = process.env.PORT || 5000;

dotenv.config();


app.set('view engine', 'pug');
app.use(express.json());
app.use('/static', express.static('public'));
app.use(express.urlencoded({ extended: false }));

try {
    db.authenticate();
    console.log('Database connected...');
    Laporan.sync()
} catch (error) {
    console.error('Error connecting to the database: ', error);
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/Passport')

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(flash());

app.use(paginate.middleware(10, 50));

app.use(morgan('dev'));

app.use('/', require('./routes/index').router);
app.use('/users', require('./routes/users'));
app.use('/rak', require('./routes/rak'));
app.use('/jenis', require('./routes/jenis'));
app.use('/satuan', require('./routes/satuan'));
app.use('/pegawai', require('./routes/pegawai'));
app.use('/barang', require('./routes/barang'));


app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    console.log(err);
    err.status = err.status || 500;
    res.status(err.status);
    res.render('error', {
        error: err
    });
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});