
const nodemailer = require('nodemailer');

// 1. Configure the email transporter using bulletproof Google settings
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',  // 🌟 Hardcoded directly to Google's cloud-trusted router
    port: 587,               // 🌟 Explicitly routing via standard TLS port 587
    secure: false,           // 🌟 MUST be false for port 587 (TLS), true is only for 465 (SSL)
    auth: {
        user: process.env.EMAIL_USER, // Kept dynamic for security
        pass: process.env.EMAIL_PASS  // Kept dynamic for security
    },
    tls: {
        rejectUnauthorized: false // 🌟 Essential on Render to bypass corporate firewall blocks
    }
});

// 2. Process form submissions and dispatch the email payload
exports.handleBookingSubmit = async (req, res) => {
    const { name, email, sport } = req.body;

    try {
        // 🌟 FIXED: Defining mailOptions so the sendMail method has a payload to deliver! 🌟
        const mailOptions = {
            from: process.env.EMAIL_USER, // Your authenticated Yahoo email address
            to: process.env.EMAIL_USER,   // Where you want to receive the notifications
            subject: `New Consultation Sync Request: ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <h2 style="color: #007BFF; border-bottom: 2px solid #007BFF; padding-bottom: 10px; margin-top: 0;">Consultation Sheet Received</h2>
                    <p><strong>Full Name:</strong> ${name}</p>
                    <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Target Sport Focus:</strong> ${sport}</p>
                    <br>
                    <p style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 0; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                        Automated dispatch log via Sport Science Applied single-page engine.
                    </p>
                </div>
            `
        };

        // Fire the email over the network map
        await transporter.sendMail(mailOptions);

        // Success bridge to trigger the checkmark modal
        return res.status(200).json({ 
            success: true, 
            message: "Booking request processed beautifully!" 
        });

    } catch (error) {
        console.error("Error sending email:", error);

        // Error bridge to trigger the cross modal cleanly
        return res.status(500).json({ 
            success: false, 
            message: `Mail server rejected connection (${error.code || 'Timeout'}). Check app credentials.` 
        });
    }
};