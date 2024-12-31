import nodemailer from 'nodemailer';

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Your email
      pass: process.env.EMAIL_PASS,  // Your App Password
    },
    logger: true,   // Optional: to get detailed logs for debugging
    debug: true,    // Optional: Enable to see detailed debug information in the console
  });
// Function to send email
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email
      to, // Recipient's email
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
