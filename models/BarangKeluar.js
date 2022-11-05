const Sequelize = require('sequelize');
const db = require('../config/Database');
const Barang = require('./Barang');
const User = require('./Users');
const Pegawai = require('./Pegawai');

const BarangKeluar = db.define('barangkeluar', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    barang_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Barang,
            key: 'id'
        }
    },
    pegawai_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Pegawai,
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
    jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

BarangKeluar.belongsTo(Barang, {foreignKey: 'barang_id', as: 'barang'});
BarangKeluar.belongsTo(Pegawai, {foreignKey: 'pegawai_id', as: 'pegawai'});
BarangKeluar.belongsTo(User, {foreignKey: 'user_id', as: 'user'});


module.exports = BarangKeluar;
