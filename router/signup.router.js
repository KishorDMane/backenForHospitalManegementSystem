const { Signup } = require("../model/signup.model")
const express = require("express");
const { Router } = require("express");
const bcrypt = require('bcrypt');

SignupRouter = express.Router()

SignupRouter.get("/", (req, res) => {
    res.send({ "msg": "serveris working" })
})


SignupRouter.post('/', async (req, res) => {

    const user = await Signup.findOne({
        where: {
            email: req.body.email
        }
    })
    if (user == undefined) {
        console.log("user not exist")


        const pass = req.body.password;

        bcrypt.hash(pass, 5, function (err, hash) {
            // Store hash in your password DB.


            Signup.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
               
                password: hash
            })
                .then(signup => {
                    res.status(201).send({ message: 'Signup successful!' });
                })
                .catch(error => {
                    res.status(500).send({ message: 'Signup failed: ' + error });
                });
        });
    } else {
        console.log("user exisist")
        res.status(500).send({ message: 'Signup failed: user exisist ' });

    }


});
module.exports = { SignupRouter }

