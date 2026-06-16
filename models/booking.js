const nodemailer = require('nodemailer');

// 🤖 HOOK UP THE SMTP SECURE REPLAY NETWORK
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Using the clean, cloud-trusted Google route we configured
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Bypasses data center handshake drops on Render
    }
});

// ⚡ HANDLING THE INCOMING FORM SUBMISSION PAYLOAD
exports.submitBooking = async (req, res) => {
    // 1. Destructure the exact input variables your frontend form sends
    const { fullName, email, phone, requestedDate, requestedTime, sportType, comments } = req.body;

    console.log(`📦 Incoming booking request intercepted from: ${email}`);

    // 2. Format a highly readable, structured HTML email layout for your inbox
    const emailLayout = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
            <h2 style="color: #007bff; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Facility Booking Reservation</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9; width: 35%;">Full Name:</td><td style="padding: 8px;">${fullName || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Phone Number:</td><td style="padding: 8px;">${phone || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Matrix Sport:</td><td style="padding: 8px;"><span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px;">${sportType || 'General'}</span></td></tr>
                <tr><td style="padding: 8px; font-weight: bold; background: #f9f9f9;">Target Date:</td><td style="padding: 8px;">${requestedDate || 'N/A'}</td></tr>
                <tr><td style="padding: 8px; font-weight: bold;">Target Time:</td><td style="padding: 8px;">${requestedTime || 'N/A'}</td></tr>
            </table>
            <div style="margin-top: 20px; background: #f5f5f5; padding: 12px; border-left: 4px solid #007bff; border-radius: 4px;">
                <strong>Athlete Consultation / Lab Notes:</strong><br>
                <p style="margin: 5px 0 0 0; color: #555;">${comments || 'No additional specifications provided.'}</p>
            </div>
        </div>
    `;

    // 3. Define the email envelope parameters
    const mailOptions = {
        from: `"Sport Science Systems" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Sends it straight back to your own admin command desk
        subject: `🚨 NEW BOOKING ALERT: ${fullName || 'Anonymous Athlete'}`,
        html: emailLayout
    };

    // 4. Fire the delivery transmission over the network matrix
    try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Telemetry email dispatched successfully to admin inbox.');
        
        // Return a clean JSON success status back to your frontend AJAX listener
        return res.status(200).json({ 
            success: true, 
            message: "Your application booking request has been securely processed!" 
        });

    } catch (error) {
        console.error('❌ Mail pipeline failed:', error);
        return res.status(500).json({ 
            success: false, 
            message: "The server encountered a transmission layout block. Please try again." 
        });
    }
};