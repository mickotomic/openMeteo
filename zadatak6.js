import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    secure: false,
    port: 587,
    
    auth: {
        user: "milorad.tomic.87@gmail.com",
        pass: "xsmtpsib-47123525deafb536435cb30266c00653b6e80ac9bff9d1c03cae8df72ce44c84-3XBwnpDW6SG978as",
    },
    tls: {
        rejectUnauthorized: false,
    }
});

const mail = {
    from: "milorad.tomic.87@gmail.com",
    to: "branimirdragicevic1@gmail.com",
    subject: "POZDRAV!",
    text: "Ovim putem saljem csv fajl!",
    attachments: [{
        filename: "Weather.csv",
        path: "Weather.csv",
    },],
};

transporter.sendMail(mail, (err, info) => {
    if (err) {
   
        console.log(err);
    } else {
        console.log(info);

    }
});
