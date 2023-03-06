const { sequelize } = require("../config/db")
const { Sequelize } = require('sequelize');

const Department = sequelize.define('department', {
  departmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
 


  
});

module.exports = Department;
