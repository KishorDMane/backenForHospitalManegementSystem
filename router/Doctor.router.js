const express = require('express');
const DoctorRouter = express.Router();
const Doctor = require('../model/Doctor.model');
const {verifyJWT}=require("../Middlewares/authentication.middelwere")
const {authorize}=require("../Middlewares/RoleBasedAuthorisation")
// Get all doctors

DoctorRouter.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
DoctorRouter.get('/Department/:id', async (req, res) => {
    console.log(req.params.id)
    try {
       newDoctor=await Doctor.findAll({
            where: {
                departmentId: req.params.id
            }
          })
          .then((newDoctor) => {
            res.json(newDoctor);

            console.log(newDoctor);
          })
          .catch((error) => {
            console.log(error);
          });
          
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


// thi route will match email and password , and if both matches , it will return the 
// info of that doctor
DoctorRouter.post('/getdocotorwithpassword', async (req, res) => {
    let {email,password}=req.body.data;
    console.log(req.params.id)
    try {
       newDoctor=await Doctor.findAll({
            where: {
                email:email,
                password:password
            }
          })
          .then((newDoctor) => {
            res.json(newDoctor);

            console.log(newDoctor);
          })
          .catch((error) => {
            console.log(error);
          });
          
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});







DoctorRouter.get('/:email',verifyJWT, async (req, res) => {
    console.log(req.params.id)
    try {
       newDoctor=await Doctor.findAll({
            where: {
                email:req.params.email
            }
          })
          .then((newDoctor) => {
            res.json(newDoctor);

            console.log(newDoctor);
          })
          .catch((error) => {
            console.log(error);
          });
          
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a specific doctor by ID
DoctorRouter.get('/:id',verifyJWT, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new doctor
DoctorRouter.post('/',verifyJWT, async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


DoctorRouter.put('/:id',verifyJWT, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (doctor) {
            await doctor.update(req.body);
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a doctor by ID
DoctorRouter.delete('/:id',verifyJWT, async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (doctor) {
            await doctor.destroy();
            res.json({ message: 'Doctor deleted' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { DoctorRouter };
