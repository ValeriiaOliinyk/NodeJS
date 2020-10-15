const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = () => {
  const msg = {
    to: "Di-Neva@bigmir.net", // Change to your recipient
    from: "oliinykvaleriia.s@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  async function main() {
    const [response] = await sgMail.send(msg);

    console.log(response);
  }
};

module.exports = {
  sendMail,
};
