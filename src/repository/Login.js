var crypto = require('crypto');
var connect = require("../utils/Connect");

exports.login = async function login(user) {
    const client = connect.client();
    var response = null;
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        user.motdepasse = crypto.createHash('md5').update(user.motdepasse).digest('hex')
        var result = await collection.find(user).toArray();
        if(result.length == 0) response = {code: 401,  data: null, message: "Identifiant ou mot de passe invalide"};
        else {
            result[0].token = crypto.randomBytes(48).toString('hex');
            await collection.updateOne(user,{$set: result[0]});
            response = {code: 200, data: result[0], message: null}
        } 
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
 
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}

exports.verifyToken = async function verifyToken(token) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        const result = await collection.find({token: token}).toArray();
        if(result == null) response = {code: 401,  data: null, message: "Veuillez vous connecter"};
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
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
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}