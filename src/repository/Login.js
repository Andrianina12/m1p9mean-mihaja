var crypto = require('crypto');
const res = require('express/lib/response');
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
            result[0].token = crypto.createHash('md5').update(user.email + new Date()).digest('hex');
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

exports.verifyToken = async function verifyToken(token, role) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        token = token.split(" ")[1];
        console.log('token', token)
        const result = await collection.find({token: token}).toArray();
        console.log('result', result);
        if(result.length == 0 || result[0].role != role) response = {code: 401,  data: null, message: "Veuillez vous connecter"};
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}

exports.getConfig = async function getConfig() {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("config");
        const result = await collection.find().toArray();
        response = {code: 200,  data: result, message: null};
    } catch(e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close()
    }
    return response;
}