const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00'
});

module.exports = db;