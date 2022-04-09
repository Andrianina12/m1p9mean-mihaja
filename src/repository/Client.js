var connect = require("../utils/Connect");
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ekaly.1019@gmail.com',
        pass: 'm1p9mean1019'
    },
    tls: {
        rejectUnauthorized: false
    }
});

function sendMail(email, mailContent) {
    var mailOptions = {
        from: 'ekaly.1019@gmail.com',
        to: email,
        subject: mailContent.subject,
        text: mailContent.text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.inscrire = async function inscrire(user) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        user.motdepasse = crypto.createHash('md5').update(user.motdepasse).digest('hex');
        user.role = "client";
        await collection.insertOne(user);
        response = {code: 200, data: null, message: "Inscription reussie"};
        var mail = {
            subject: "Bienvenue chez E-kaly",
            text: "Bienvenue à bord!! Nous sommes une équipe disponible pour la livraison à tout moment de vos petit creux. Passez vos commandes en visitant tous nos restaurants partenaires ... Il y en a pour tous les gouts."
        }
        sendMail(user.email, mail);
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}

exports.listResto = async function listResto() {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("restaurants");
        const result = await collection.find().toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.commander = async function commander(commande) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("commandes");
        await collection.insertOne(commande);
        const result = await collection.find().toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}