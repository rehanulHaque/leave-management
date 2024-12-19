import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'raphaelle.nitzsche@ethereal.email',
        pass: 'zuXcEskH8p5qwrbjNx'
    }
});
// const info = await transporter.sendMail({
//     from: '"Rehan" <rehan@gmail.com>', // sender address
//     to: "rehan70013@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });
//   console.log(info)
