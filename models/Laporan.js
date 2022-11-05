const Sequelize = require('sequelize');
const db = require('../config/Database');

const Laporan = db.define('laporan', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_barang: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tanggal: {
        type: Sequelize.DATE,
        allowNull: false
    },
    keterangan: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jumlah: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user : {
        type: Sequelize.STRING,
        allowNull: false
    },
    peminjam : {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Laporan;
