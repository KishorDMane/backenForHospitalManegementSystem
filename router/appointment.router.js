const express = require('express');
const { Sequelize } = require('sequelize');
const AppointmentRouter = express.Router();
const Appointment = require('../model/Appointment.model');
const Doctor = require('../model/Doctor.model');
const { Patient } = require("../model/Patient.model")

const {verifyJWT}=require("../Middlewares/authentication.middelwere")


Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Appointment.belongsTo(Patient, { foreignKey: 'patientId' });

// Get all appointments
AppointmentRouter.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.findAll({

            include: [{ model: Doctor }, { model: Patient }],
        });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get a single appointment by ID
AppointmentRouter.get('/:id',verifyJWT, async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [{ model: Doctor }, { model: Patient }],
        });
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get appointments by doctor ID
AppointmentRouter.get('/doctor/:id', async (req, res) => {
    const doctorId = req.params.id;
    try {
        const appointments = await Appointment.findAll({
            where: { doctorId },
            include: [{ model: Doctor }, { model: Patient }],
        });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get appointments by patient ID
AppointmentRouter.get('/patient/:id',verifyJWT, async (req, res) => {
    const patientId = req.params.id;
    try {
        const appointments = await Appointment.findAll({
            where: { patientId },
            include: [{ model: Doctor }, { model: Patient }],
        });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// Create a new appointment
AppointmentRouter.post('/', async (req, res) => {
 console.log(req.body)
    const { dateTime, patientName, doctorId,PaymentStatus,doctorName, patientId, note } = req.body.data;
    Doctor.update(
        { availability:false },
        { where: { doctorId:doctorId } }
      )
    try {
        const appointment = await Appointment.create({
            dateTime,
            patientName,
            doctorId,
            patientId,
            doctorName,
            PaymentStatus,
            note,
        });
        
        res.json({message:"saved successfully",appointment});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update an appointment
AppointmentRouter.put('/:id',verifyJWT, async (req, res) => {
    const { dateTime, patientName, doctorId, note,PaymentStatus } = req.body;
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        appointment.dateTime = dateTime;
        appointment.patientName = patientName;
        appointment.doctorId = doctorId;
        appointment.patientId = patientId;
        appointment.PaymentStatus=PaymentStatus;
        appointment.doctorName=doctorName
        appointment.note = note;
        await appointment.save();
        res.json(appointment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete an appointment
AppointmentRouter.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id);
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found' });
        }
        await appointment.destroy();
        res.json({ msg: 'Appointment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = { AppointmentRouter };



