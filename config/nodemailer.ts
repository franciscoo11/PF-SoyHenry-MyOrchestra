import nodemailer from "nodemailer";

const { EMAIL, EMAIL_SECRET } = process.env;

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: EMAIL,
        pass: EMAIL_SECRET
    }
})

transporter.verify().then(() => {
    console.log('Configuration correct!')
})