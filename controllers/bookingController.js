const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 10000, 
    family: 4 
});

// ⚡ EXTRA SAFETY CHECK: Verify SMTP connection pool on boot without crashing
transporter.verify((error, success) => {
    if (error) {
        console.error("⚠️ SMTP Alert: Connection credentials invalid. Form submissions will display network dropouts.");
    } else {
        console.log("🚀 SMTP Secure Link Established: Mailer ready to route messages.");
    }
});

exports.handleBookingSubmit = async (req, res) => {
    const { name, email, sport } = req.body;

    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, 
            subject: `New Consultation Sync Request: ${name}`,
            html: `<h3>New Consultation Sheet Received</h3><p><strong>Name:</strong> ${name}</p>`
        };

        // If this fails, the catch block below handles it safely instead of throwing a 502
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ 
            success: true, 
            message: "Booking request processed beautifully!" 
        });

    } catch (error) {
        console.error("❌ Mailer process failed:", error.message);
        return res.status(500).json({ 
            success: false, 
            message: "SMTP link dropped out, but your local user interface is operating normally." 
        });
    }
};