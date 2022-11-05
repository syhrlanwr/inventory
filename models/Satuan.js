const {Sequelize} = require('sequelize');
const db = require('../config/Database');
const {DataTypes} = Sequelize;


const Satuan = db.define('satuan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


module.exports = Satuan;