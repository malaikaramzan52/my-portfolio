const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');

// @route   POST /api/contact
// @desc    Receive a message, save it, and send an email notification
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "Please provide name, email, and message" });
    }

    try {
        // 1. Save to Database
        const newMessage = new Message({ name, email, message });
        const savedMessage = await newMessage.save();

        let emailSentSuccessfully = false;
        let emailError = '';

        // 2. Setup Nodemailer Transporter
        // Check if configuration exists
        if (
            process.env.EMAIL_USER && 
            process.env.EMAIL_PASS && 
            process.env.EMAIL_USER !== 'your-email@gmail.com'
        ) {
            try {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                });

                const mailOptions = {
                    from: `"${name}" <${process.env.EMAIL_USER}>`,
                    to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
                    replyTo: email,
                    subject: `New Portfolio Message from ${name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6; max-width: 600px; border: 1px solid #ddd; border-radius: 8px;">
                            <h2 style="color: #0A9396; border-bottom: 2px solid #0A9396; padding-bottom: 8px;">New Contact Message Received</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #EE9B00; margin-top: 15px;">
                                <p style="margin: 0; font-weight: bold; color: #555;">Message:</p>
                                <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                    `
                };

                await transporter.sendMail(mailOptions);
                emailSentSuccessfully = true;
            } catch (err) {
                console.error("Nodemailer Error:", err.message);
                emailError = `Email delivery failed: ${err.message}. But your message was saved to our database!`;
            }
        } else {
            emailError = "Email service not configured (email credentials are placeholders). Message was saved to the database successfully!";
        }

        res.status(201).json({
            message: "Message received successfully!",
            data: savedMessage,
            emailSent: emailSentSuccessfully,
            warning: emailSentSuccessfully ? null : emailError
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
