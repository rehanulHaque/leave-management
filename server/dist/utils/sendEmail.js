"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.transporter = nodemailer_1.default.createTransport({
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
