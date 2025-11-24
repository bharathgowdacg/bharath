import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.post('/api/send', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  try {
    // Create transporter using SMTP credentials in env
    let transporter;
    let ethereal = false;
    let testAccount = null;
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
      // If SMTP creds are not provided, use Ethereal test account so we can test locally
      testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      ethereal = true;
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        }
      });
    }

    const recipient = process.env.EMAIL_TO || (ethereal && testAccount ? testAccount.user : null);
    const mailOptions = {
      from: `${name} <${email}>`,
      to: recipient,
      subject: process.env.EMAIL_SUBJECT || `Portfolio contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    const result = { ok: true, messageId: info.messageId };
    if (ethereal) {
      // Provide preview URL for Ethereal test messages
      result.preview = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL: %s', result.preview);
    }
    return res.json(result);
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server listening on http://localhost:${PORT}`);
});
