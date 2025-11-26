const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const AdminModel = sequelize.define('Administrador', 
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING, 
            allowNull : false
        },
        apellido: {
            type: DataTypes.STRING, 
            allowNull : false
        },
        email: {
            type: DataTypes.STRING, 
            allowNull : false, 
            unique: true
        },
        password_hash: {
            type: DataTypes.STRING, 
            allowNull : false
        }
    }, 
    {
        tableName : "administradores", 
        timestamps : false
    }
);

module.exports = AdminModel;