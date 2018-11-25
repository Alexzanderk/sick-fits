const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "92a0cdd1fc5b75",
    pass: "e5814863676310"
  }
});

const makeANiceEmail = text => `
    <div className="email" style="
        border: 1px solid #000;
        padding: 20px;
        font-family: Roboto;
        line-height: 2;
        font-size: 20px
    ">
      <h2>Hello there</h2>
      <p>${text}</p>
    </div>
  `;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
