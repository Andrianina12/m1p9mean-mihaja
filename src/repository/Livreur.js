var connect = require("../utils/Connect");

exports.listeCommande = async function list(token) {
    const client = connect.client();
    var response = null;
    try {
        await client.connect();
        var dbo = client.db("m1p9mean");
        var collection = dbo.collection("users");
        const user = await collection.find({token: token}).toArray();

        collection = dbo.collection("commandes");
        const result = await collection.find({livreur: user[0].identifiant}).toArray();
        response = {code: 200, data: result, message: null}
    } catch (e) {
        response = {code: 501,  data: null, message: e.message};
        console.error(e);
    } finally {
        await client.close();
    }
    return response;
}