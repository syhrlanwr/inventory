const {Sequelize} = require('sequelize');
const db = require('../config/Database');
const {DataTypes} = Sequelize;

const Pegawai = db.define('pegawai', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nip: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});


module.exports = Pegawai;