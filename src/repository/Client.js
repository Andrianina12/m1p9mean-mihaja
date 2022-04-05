var connect = require("../utils/Connect");

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