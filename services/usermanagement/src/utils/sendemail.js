/**
 * TODO: Make dynamic subject and message and user email via params, send diffent type of emails form the controller.
 */
const nodemailer = require("nodemailer");

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  requireTLS: true,
  secure: false,
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_APP_PASS,
  },
});

/**
 * This function sends emails to user
 * @param {*} recieverEmails
 * @param {*} emailSubject
 * @param {*} emailMessage
 *
 * @function utility
 */
const sendEmail = async (
  senderName,
  senderEmail,
  recieverEmails,
  emailSubject,
  emailMessage
) => {
  // Send email
  const info = await transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: recieverEmails, // add comma for multiple emails
    subject: emailSubject,
    html: emailMessage,
  });

  // Log message id
  console.log("Message sent: %s", info.messageId);
};

// export
module.exports = sendEmail;
