// NOTA: Este archivo debe ir en Vercel Functions o backend seguro
// NUNCA expongas la API key en el frontend

export default async function handler(req, res) {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const { email } = req.body;
    
    const msg = {
        to: email,
        from: 'updates@beachgirl.me',
        subject: 'Welcome to BeachGirl Premium',
        text: 'Thanks for subscribing to daily updates!',
        html: '<strong>Welcome! New content daily at beachgirl.me</strong>',
    };
    
    try {
        await sgMail.send(msg);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
}
