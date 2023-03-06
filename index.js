const express = require("express")
const { Sequelize } = require('sequelize');
require('dotenv').config()
const cors = require('cors')
const { sequelize } = require("./config/db")



const { SignupRouter } = require("./router/signup.router");
const { LoginRouter } = require("./router/logn.router");
const { DepartmentRouter } = require("./router/Department.router");
const { DoctorRouter } = require("./router/Doctor.router");
const { AppointmentRouter } = require("./router/appointment.router");
const {PatientRouter}=require("./router/patient.rouer");
const {OauthRouter}=require("./router/oauth.router.js");
const { verifyJWT, verifyRefreshToken } = require("./Middlewares/authentication.middelwere");

const app = express()
app.use(express.json());
app.use(cors())
app.use("/oauth",OauthRouter)
app.use("/auth/register", SignupRouter)
app.use("/auth/login", LoginRouter)
app.use("/Department", DepartmentRouter)
app.use("/doctor", DoctorRouter)
app.use("/Appointment",AppointmentRouter)
app.use("/patient",PatientRouter)
app.get("/", (req, res) => {
    res.send({ "msg": "serveris working" })
})
app.listen(8080, async () => {
    await sequelize;
    console.log("8080 is Started");
});


