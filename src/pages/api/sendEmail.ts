import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ApiResponse = {
  error?: string;
  message?: string;
  success?: boolean;
  messageId?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
  }

  const {
    name,
    email,
    subject,
    message,
    phone_number,
  }: {
    name: string;
    email: string;
    subject: string;
    message: string;
    phone_number: string;
  } = req.body;

  if (!name || !email || !subject || !message || !phone_number) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Contact Form <${process.env.EMAIL_FROM}>`,
    to: `armogroup.tech@gmail.com`,
    subject: `Contact Form Submission: ${subject}`,
    text: `
    New Contact Form Submission
    
    Name: ${name}
    Email: ${email}
    Phone: ${phone_number}
    Subject: ${subject}
    
    Message:
    ${message}
    
    This message was sent from the contact form on your website.
    `,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        h1 { color: #4a4a4a; border-bottom: 2px solid #4a4a4a; padding-bottom: 10px; }
        .info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
        .info p { margin: 5px 0; }
        .message { margin-top: 20px; }
        .footer { margin-top: 20px; font-size: 0.8em; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Contact Form Submission</h1>
        <div class="info">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone_number}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div class="message">
          <h2>Message:</h2>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div class="footer">
          <p>This message was sent from the contact form on your website.</p>
        </div>
      </div>
    </body>
    </html>
      `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Error sending email:', error); // Log the error to see the actual message
    return res.status(500).json({
      error: error?.message,
      message: 'Failed to send email',
    });
  }
}
