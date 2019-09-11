const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (user) => {
    sgMail.send({
        to: user.email,
        from: process.env.EMAIL,
        subject: 'Welcome!',
        text: `Hi ${user.name}, welcome to the notes app!`
    });
};

module.exports = welcomeEmail;
