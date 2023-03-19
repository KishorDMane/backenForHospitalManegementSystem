const { Sequelize } = require('sequelize');
require('dotenv').config()
const cors = require('cors')
const pass = process.env.Pass
// console.log(pass)
const sequelize = new Sequelize("cuvbuavd_kishor", "kishordb", process.env.password, {
    host: '135.125.65.213',
    port: 1434,
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true
        }
    }
})

sequelize.authenticate().then(() => {
    console.log("Connection succesfull to db")
}).catch((err) => {
    console.log("Failed to connect to db")
    console.log(err)
})
module.exports = { sequelize }



