const { sequelize } = require("../config/db")
const { Sequelize } = require('sequelize'); 
const Appointment = sequelize.define('Appointment', {
  AppointmentId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  patientName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  PaymentStatus: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  doctorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  doctorName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  note: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
module.exports = Appointment;
