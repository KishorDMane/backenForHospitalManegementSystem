const express = require('express');
const PatientRouter = express.Router();
const { Patient } = require('../model/Patient.model');
const {verifyJWT}=require("../Middlewares/authentication.middelwere")

// GET all patients
PatientRouter.get('/',verifyJWT, async (req, res) => {
try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
PatientRouter.get('/:email',verifyJWT, async (req, res) => {
    console.log(req.params.id)
    try {
        PatientNew=await Patient.findAll({
            where: {
                email:req.params.email
            }
          })
          .then((PatientNew) => {
            res.json(PatientNew);

            // console.log(newDoctor);
          })
          .catch((error) => {
            console.log(error);
          });
          
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET a single patient by ID
PatientRouter.get('/:patientId',verifyJWT, async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.patientId);
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).send('Patient not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST a new patient
PatientRouter.post('/', async (req, res) => {
    const { name, email, phone,  city, country } = req.body.body;
    console.log(req.body)
    console.log(name, email, phone,  city, country)
    try {
        const patient = await Patient.create({
            name,
            email,
            phone,
            city,
            country
        });
        res.json(patient);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// PUT update an existing patient
PatientRouter.put('/:id',verifyJWT, async (req, res) => {
    const { name, email, phone, dob,city, country } = req.body;
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (patient) {
            await patient.update({
                name,
                email,
                phone,
                dob,
                city,
                country
            });
            res.json(patient);
        } else {
            res.status(404).send('Patient not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a patient by ID
PatientRouter.delete('/:id',verifyJWT, async (req, res) => {
    try {
        const patient = await Patient.findByPk(req.params.id);
        if (patient) {
            await patient.destroy();
            res.json({ message: 'Patient deleted' });
        } else {
            res.status(404).send('Patient not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = {PatientRouter};
