const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (email, token) => {
  try {
    const msg = {
      to: email,
      from: process.env.EMAIL,
      subject: "Email verification",
      text: "Verify Email Addresses",
      html: `<a href="${process.env.HOST}:${process.env.PORT}/auth/verify/${token}">Follow link</a>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMail,
};
