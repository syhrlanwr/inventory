const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;
const db = require('../config/Database');
const Jenis = require('./Jenis');
const Satuan = require('./Satuan');
const Rak = require('./Rak');
const Pegawai = require('./Pegawai');
const User = require('./Users');

const Barang = db.define('barang', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    jenis_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Jenis,
            key: 'id'
        }
    },
    satuan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Satuan,
            key: 'id'
        }
    },
    rak_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Rak,
            key: 'id'
        }
    },
    pegawai_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pegawai,
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
});

Barang.belongsTo(Jenis, {foreignKey: 'jenis_id', as: 'jenis'});
Barang.belongsTo(Satuan, {foreignKey: 'satuan_id', as: 'satuan'});
Barang.belongsTo(Rak, {foreignKey: 'rak_id', as: 'rak'});
Barang.belongsTo(Pegawai, {foreignKey: 'pegawai_id', as: 'pegawai'});
Barang.belongsTo(User, {foreignKey: 'user_id', as: 'user'});


module.exports = Barang;

