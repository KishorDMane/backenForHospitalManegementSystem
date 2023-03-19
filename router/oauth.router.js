const express = require('express');

// const bcrypt=require("")
const jwt = require("jsonwebtoken")
const qs = require('querystring');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {OauthSignup}=require("../model/Oauthuser.model.js")

const OauthRouter = express.Router();

const REDIRECT_URI = 'http://localhost:8000/oauth/auth/google/callback';

const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';

const { OAuth2Client } = require('google-auth-library');

const oAuth2Client = new OAuth2Client("172721478034-tesnpt2cg096svdifscbo9vm953vac1s.apps.googleusercontent.com", "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", REDIRECT_URI);

OauthRouter.get('/auth/google', (req, res) => {
  const params = {
    response_type: 'code',
    client_id: "50186676496-pnqtl7e865c3tk26e6951sq969hbfiv3.apps.googleusercontent.com",
    redirect_uri: REDIRECT_URI,
    scope:'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
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
    client_id: "50186676496-pnqtl7e865c3tk26e6951sq969hbfiv3.apps.googleusercontent.com",
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

    const userData  = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',{
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    }
    );
   
const profiledata = await userData.json();
const {email,name,picture} = profiledata;
const token = jwt.sign({email,name,picture},process.env.JWT_SECRET);
  console.log(email,name,picture);
  console.log(response.status);
  OauthSignup.create({
email,name
  }).then(response=>console.log("added successfully",response)).catch(err=>console.log(err))
const redirectUrl = `https://frontendofhms-v29b.vercel.app/?token=${token}&name=${name}&picture=${picture}&email=${email}`;
return   res.redirect(redirectUrl);
}catch (error) {
    console.error(error);
    res.status(500).send('Error authenticating with Google.');
  }
});

module.exports = {OauthRouter};