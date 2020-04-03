const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');

module.exports = {
    register(email) {
        const msg = {
            to: `${email}`,
            from: "noreply.languagelearning@mail.com",
            subject: "You've Registered !",
            html: `
            You've Register to language learning Apps!`
        };
        return sgMail.send(msg);
    },

    login(email) {
        const msg = {
            to: `${email}`,
            from: "noreply.languagelearning@mail.com",
            subject: "You've Login !",
            html: `
            You've Login to language learning Apps!`
        };
        return sgMail.send(msg);
    }
}