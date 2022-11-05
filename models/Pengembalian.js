const Sequelize = require('sequelize');
const db = require('../config/Database');
const BarangKeluar = require('./BarangKeluar');
const User = require('./Users');

const Pengembalian = db.define('pengembalian', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tanggal: {
        type: Sequelize.DATE,
        allowNull: false
    },
    jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    barangkeluar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: BarangKeluar,
            key: 'id'
        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
});

Pengembalian.belongsTo(BarangKeluar, {foreignKey: 'barangkeluar_id', as: 'barangkeluar'});
Pengembalian.belongsTo(User, {foreignKey: 'user_id', as: 'user'});

module.exports = Pengembalian;
