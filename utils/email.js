const nodemailer = require("nodemailer");
const email = async options => {
  // create a transport
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_port,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_user,
      pass: process.env.NODEMAILER_pass,
    },
  });
  // define email options
  const emailOption = {
    from: "Bibek Shrestha <shresthabbks@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // console.log(options);

  // send the email
  const info = await transporter.sendMail(emailOption);
  console.log(info);
};

module.exports = email;
