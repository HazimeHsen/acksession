import nodemailer from 'nodemailer';

export default async function handler(req, res) {


  try {
    const { email, message } = req.body;

    if (!email || !/^.+@.+\..+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    if (!message) {
      return res.status(400).json({ error: 'Please enter a message' });
    }

    const MAX_EMAIL_LENGTH = 512;
    const MAX_MESSAGE_LENGTH = 4096;

    if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({
        error: `Please enter an email fewer than ${MAX_EMAIL_LENGTH} characters`,
      });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Please enter a message fewer than ${MAX_MESSAGE_LENGTH} characters`,
      });
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      // Your email service configuration (SMTP, etc.)
      service: 'gmail',
      auth: {
        user: 'hazimehussein01@gmail.com',
        pass: 'smof fisu ouce eers',
      },
    });

    // Send email using Nodemailer
    const mailOptions = {
      from: email,
      to: 'hazimehussein01@gmail.com',
      subject: `New message from ${email}`,
      text: `From: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
