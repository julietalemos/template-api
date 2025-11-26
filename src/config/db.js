const { Sequelize } = require('sequelize');
const envs = require('./envs');
require('dotenv').config();

// Conexion
const {database, host, user, password, port} = envs.db_config; 

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",
    port: port
});

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log('Base de datos conectada con SEQUELIZE');
    } catch (error) {
        console.error(error);
    }
}

testConnection();
module.exports = sequelize;
