require("dotenv").config()

const express = require("express");
const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Signup } = require("../model/signup.model")

LoginRouter = express.Router()
LoginRouter.get("/", (req, res) => {
    res.send({ "msg": "serveris working" })
})


LoginRouter.post('/', (req, res) => {
    const { email, password } = req.body;

    Signup.findOne({ where: { email } })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Incorrect password' });
                    }

                    // create JWT token here
                    const payload = {
                        id: user.id,
                        email: user.email,
                        role:user.role
                    };
                    const secret = process.env.JWT_SECRET;
                    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
                    const options = { expiresIn: '1d' };
                    const ReOptions = { expiresIn: '7d' };

                    const refreshToken = jwt.sign(payload, refreshTokenSecret, ReOptions);

                    const token = jwt.sign(payload, secret, options);
                    res.json({ message: 'Success', token, refreshToken,name:user.first_name,email:user.email,last_name:user.last_name });
                })
                .catch(err => {
                    throw new Error(err);
                });
        })
        .catch(err => {
            throw new Error(err);
        });
});


module.exports = { LoginRouter }