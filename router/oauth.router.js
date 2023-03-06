require("dotenv").config()

const express = require("express");
const { Router } = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Signup } = require("../model/signup.model")

let OauthRouter = express.Router()

const qs = require('querystring');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const REDIRECT_URI = 'http://localhost:8080/oauth/auth/google/callback';
const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';


OauthRouter.get('/auth/google', (req, res) => {
    const params = {
      response_type: 'code',
      client_id: "172721478034-tesnpt2cg096svdifscbo9vm953vac1s.apps.googleusercontent.com",
      redirect_uri: REDIRECT_URI,
      scope:'https://www.googleapis.com/auth/userinfo.email',
    };
    const query = qs.stringify(params);
    const url = `${AUTH_ENDPOINT}?${query}`;
    res.redirect(url);
  });
  
  OauthRouter.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
  console.log(code)
    const params = {
      code,
      client_id: "172721478034-tesnpt2cg096svdifscbo9vm953vac1s.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri:REDIRECT_URI,
      grant_type: 'authorization_code',
    };
  
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
  
    let encodeddata=new URLSearchParams(params)
    try {
  
      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: encodeddata
      });
      let data=await response.json()
      const emailData  = await fetch(
        'https://www.googleapis.com/userinfo/v2/me?fields=email',{
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
      );
  
      const {email} = await emailData.json();
  console.log(email);
      console.log(data.access_token);
      console.log(response.status);
  console.log(data)
  let userdata={
    email:email,
    access_token:data.access_token,
  }

  const redirectUrl = `http://localhost:5173/?access_token=${data.access_token}&email=${email}`;
  
  // console.log(data)
  return   res.redirect(redirectUrl);
  
  // return  res.json({message:"authorization successfull",access_token:data.access_token})
    } catch (error) {
      console.error(error);
      res.status(500).send('Error authenticating with Google.');
    }
  });
  

  module.exports = {OauthRouter}