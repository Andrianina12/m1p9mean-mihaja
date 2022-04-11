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

exports.listeCommande = async function list() {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("commandes");
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

exports.updateCommande = async function update(commande) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("commandes");
        var param = {
            nom: commande.nom,
            date: commande.date
        }
        var update = {
            livreur: commande.livreur
        }
        await collection.updateOne(param, {$set: update});
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

exports.insertResto = async function insertResto(resto) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("restaurants");
        await collection.insertOne(resto);
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}

exports.getLivreur = async function getLivreur() {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        const result = await collection.find({role: "Livreur"}).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.getUsers = async function getUsers() {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        const result = await collection.find({$or: [{role: "Livreur"}, {role: "Restaurant"}]}).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.insertUser = async function insertUser(user) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        var mail = {
            subject: "Bienvenue chez E-kaly",
            text: "Bienvenue dans notre equipe!! En tant que "+ user.role +", vos coordonnées seront: Email: " + user.email + " Mot de passe: " + user.motdepasse
        }
        user.identifiant = crypto.createHash('md5').update(user.email).digest('hex');
        user.motdepasse = crypto.createHash('md5').update(user.motdepasse).digest('hex');
        await collection.insertOne(user);
        sendMail(user.email, mail);
        const result = await collection.find({$or: [{role: "Livreur"}, {role: "Restaurant"}]}).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.updateUser = async function updateUser(user) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("user");
        var param = {
            identifiant: user.identifiant
        }
        await collection.updateOne(param, {$set: user});
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

exports.stat = async function stat(param) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("commandes");
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

exports.calculateProfits = async function calculateProfits(data) {
    const client = connect.client();
    var response = null
    console.log(new Date())
    try {
        await client.connect();
        var result = null;
        if(data) {
            if (data.gte && data.lte) {
                result = await client.db("m1p9mean").collection("commandes").aggregate([
                    {
                        $match: {
                            "restaurant": data.restaurant, "date": {
                                $gte: data.gte, $lte: data.lte
                            }
                        }
                    },
                    {
                        $group: { "_id": "$date", "beneficeTotalResto": { $sum: "$benefice_resto" }, "beneficeTotalEkaly": { $sum: "$benefice_ekaly" } }
                    }
                ]).toArray()
            } else{
                result = await client.db("m1p9mean").collection("commandes").aggregate([
                    {
                        $match: {
                            "restaurant": data.restaurant
                        }
                    },
                    {
                        $group: { "_id": "$date", "beneficeTotalResto": { $sum: "$benefice_resto" }, "beneficeTotalEkaly": { $sum: "$benefice_ekaly" } }
                    }
                ]).toArray()
            }
        } else {
            result = await client.db("m1p9mean").collection("commandes").aggregate([
                    {
                        $group: { "_id": "$date", "beneficeTotalEkaly": { $sum: "$benefice_ekaly" } }
                    }
                ]).toArray()
        }
        response = {code: 200, data: result, message: null}
        console.log(result)
    } catch (e) {
        console.error(e)
        response = {code: 501,  data: null, message: e.message};
    } finally {
        client.close()
    }
    return response
}
