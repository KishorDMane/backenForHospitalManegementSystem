const { sequelize } = require("../config/db")
const { Sequelize } = require('sequelize');


const Patient = sequelize.define('Patient', {
  patientId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: true,
  },
});

module.exports = { Patient };
