
const nodemailer = require('nodemailer');


const otpgenerator=()=>{
    let otp=Math.floor(Math.random()*9000+1000)
    return otp
      }

async function sendEmail(otp,email){
    try {
    
    const transport=nodemailer.createTransport({
    service:"gmail",
    auth:{
    type:"OAuth2",
    user:"anuragupadhyay172912313@gmail.com",
    accessToken:"ya29.a0AVvZVspOAhMenWW37HuBNxOgMkRCSFi2BAnfaJ7epKuASwdnnmN0XlhF8XKyfCAcZDkdWJ-IBaB6aEtC6h3qZ1HU-RYVfRdS5_RYBpbfWi2OieLvvo7PB3b3vcR84fEKM4XIE4RPqOCqVuj68cozj97pwlDuaCgYKAXMSARASFQGbdwaIXDo__cOcDhsnukmTHrdDdQ0163",
    refreshToken: '1//04eybFMqLc9YVCgYIARAAGAQSNwF-L9IrNKjsQXervouD1mukcSB1n9SqR_s3ge0L68Gz-oh4HNv3qKh6g9gAlCYJ895iUfIbQkU',
    clientId:"172721478034-tesnpt2cg096svdifscbo9vm953vac1s.apps.googleusercontent.com",
    clientSecret:"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"
    }
    })

    const mailOptions={
        from:"anuragupadhyay172912313@gmail.com",
        to:email,
        subject:"this is a test email",
        html:`<h1>here is your otp ${otp}</h1>`,
        body:"this is your otp for signing up"+`${otp}`
        }
        
        const result=await transport.sendMail(mailOptions)
        return result;
        
        } catch (error) {
        return error
 }
 }


     



 sendEmail(908129038,"anuragupadhyay1723@gmail.com").then((result)=>{
    console.log("email is sent ",result)
    
    }).catch((error)=>{
        console.log(error)
    })

