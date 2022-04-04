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
        const result = await collection.find(user).toArray();
        if(result == null) response = {code: 401,  data: null, message: "Identifiant ou mot de passe invalide"};
        else {
            var token = crypto.randomBytes(48).toString('hex');
            user = {user, token: token};
            console.log(user);
            response = {code: 200, data: user, message: null}
        } 
 
        // Make the appropriate DB calls
        // await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    console.log("response", response);
    return response;
}