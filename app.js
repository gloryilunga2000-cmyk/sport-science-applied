// Load environment variables from .env file
require('dotenv').config();

// ==========================================
// 1. IMPORTS & CONFIGURATION
// ==========================================
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer'); // 🌟 IMPORTED FOR GYM REGISTRATION EMAIL DISPATCH
const app = express();
const PORT = process.env.PORT || 3000;

// Import Controllers
const sportController = require('./controllers/sportController');
const bookingController = require('./controllers/bookingController');
const chatController = require('./controllers/chatController');
const SportModel = require('./models/sportModel');

// 🌟 CONFIGURING SHARED TRANSPORTER FOR THE NEW ROUTE
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mail.yahoo.com',
    port: parseInt(process.env.EMAIL_PORT) || 587, // 🌟 Changed default fallback to 587
    secure: false, // 🌟 Must be false for port 587/TLS connection streams
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // 🌟 Bypasses cloud data center handshake blocks
    }
});
// Set EJS as the "View" engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ==========================================
// 2. MIDDLEWARE (The Request Processors)
// ==========================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ==========================================
// 3. ROUTES & CONTROLLER LINKAGE
// ==========================================

// 🌟 UNIFIED HOME ROUTE: Now houses all sections on a single scrolling page
app.get('/', (req, res) => {
    const availableSports = SportModel.getAllSports();
    res.render('home', { 
        pageTitle: 'Sport Science Applied - Home',
        sportsList: availableSports
    });
});

// Informational Detail Route (Keep this in case they click a specific sport card)
app.get('/sports/:code', sportController.getSportDetails);

// AJAX API Endpoint Route (Processes Gemini chat directly from the home section container)
app.post('/api/chat', chatController.handleChatMessage);

// Booking Submission Route (Processes your appointment application natively)
app.post('/booking/submit', bookingController.handleBookingSubmit);

// 🌟 NEW ROUTE: Processes Gym Network Form Submissions and updates your email database 🌟
app.post('/gym/register', async (req, res) => {
    // 🌟 UPDATED: Destructured gymPhone parameter from incoming request body
    const { gymName, gymEmail, gymPhone, gymFocus } = req.body;

    console.log(`[Database Log Initiation] Registering Facility: ${gymName} | Phone: ${gymPhone}`);

    const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: process.env.EMAIL_USER,   
        subject: `🚨 [NETWORK UPDATE] New Facility Profile: ${gymName}`,
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <div style="text-align: center; margin-bottom: 20px; border-bottom: 2px solid #007BFF; padding-bottom: 15px;">
                    <h2 style="color: #007BFF; margin: 0; font-size: 1.5rem;">Sport Science Applied</h2>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 0.9rem;">Global Facility Network Registry Database</p>
                </div>
                
                <p style="font-size: 1rem; line-height: 1.5; color: #334155;">
                    A new sport science training hub or lab environment has registered to connect with your athlete pipeline. Below is the parsed payload profile data:
                </p>

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 0.95rem; text-align: left;">
                    <thead>
                        <tr style="background-color: #f8fafc; border-bottom: 2px solid #cbd5e1;">
                            <th style="padding: 12px 10px; font-weight: 700; color: #475569; width: 35%;">Database Key</th>
                            <th style="padding: 12px 10px; font-weight: 700; color: #475569;">Registered Facility Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px 10px; font-weight: bold; color: #64748b;">Facility Name</td>
                            <td style="padding: 12px 10px; color: #1e293b; font-weight: 600;">${gymName}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px 10px; font-weight: bold; color: #64748b;">Contact Email</td>
                            <td style="padding: 12px 10px; color: #007BFF;"><a href="mailto:${gymEmail}" style="color: #007BFF; text-decoration: none;">${gymEmail}</a></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px 10px; font-weight: bold; color: #64748b;">Contact Number</td>
                            <td style="padding: 12px 10px; color: #1e293b; font-weight: 600;">${gymPhone}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #e2e8f0;">
                            <td style="padding: 12px 10px; font-weight: bold; color: #64748b;">Testing / Training Focus</td>
                            <td style="padding: 12px 10px; color: #1e293b; text-transform: capitalize;">${gymFocus}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px 10px; font-weight: bold; color: #64748b;">Timestamp Logs</td>
                            <td style="padding: 12px 10px; color: #64748b; font-size: 0.85rem;">${new Date().toLocaleString()} (Automated Verification)</td>
                        </tr>
                    </tbody>
                </table>

                <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="font-size: 0.8rem; color: #94a3b8; margin: 0;">
                        This document is a secure, automated data transmission transaction issued natively via your Sport Science Applied environment dashboard architecture.
                    </p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ 
            success: true, 
            message: "Facility successfully logged and emailed to database vault." 
        });
    } catch (error) {
        console.error("Database automated email dispatch failed:", error);
        return res.status(500).json({ 
            success: false, 
            message: "SMTP database server timeout boundary met." 
        });
    }
});

// Asynchronously fetches sport science research blocks for infinite scrolling elements
app.get('/api/research-feeds', (req, res) => {
    const researchDatabase = [
        { title: "Neuromuscular Adaptations", journal: "JSCR (2025)", summary: "High-velocity eccentric training shows a 14% increase in rate of force development (RFD) among elite sprinters over 8 weeks." },
        { title: "Glycogen Resynthesis Matrix", journal: "Int. J. Sports Med", summary: "Co-ingestion of 0.3g/kg protein with 1.2g/kg carbohydrates maximizes GLUT-4 transporter activation post-exhaustive exercise." },
        { title: "Myofibrillar Hypertrophy Limits", journal: "Frontiers in Phys.", summary: "Mechanical tension pathways (mTORC1) remain highly active up to 48 hours post-exercise when loading exceeds 75% 1RM mapping." },
        { title: "Isokinetic Hamstring Ratios", journal: "Kinesiology Today", summary: "Maintaining an eccentric hamstring to concentric quadriceps strength ratio of >0.65 drastically mitigates non-contact ACL strain thresholds." }
    ];
    res.json(researchDatabase);
});

// ==========================================
// GLOBALS & ERROR HANDLING
// ==========================================
app.use((req, res) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found - Sport Science Applied' });
});

// ==========================================
// 4. START THE SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`Sport Science Applied server is running on http://localhost:${PORT}`);
});

// Live deployment verification commentgit status