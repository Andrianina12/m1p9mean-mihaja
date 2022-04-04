const {MongoClient} = require('mongodb');

// const uri = "mongodb+srv://m1p9mean:m1p9mean@cluster0.ljg3b.mongodb.net/m1p9mean?retryWrites=true&w=majority";

const uri = "mongodb+srv://m1p9mean:m1p9mean@cluster0.ljg3b.mongodb.net/m1p9mean?retryWrites=true&w=majority";

function client() {
    return new MongoClient(uri);
}

module.exports = {client};

// async function main(){
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://m1p9mean:m1p9mean@cluster0.ljg3b.mongodb.net/m1p9mean?retryWrites=true&w=majority";
 

//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         var dbo = client.db("m1p9mean");
//         var collection = dbo.collection("users");
//         const results = await collection.find().toArray();
//         console.log("Results", results);
//         console.log("Connect ... ");
 
//         // Make the appropriate DB calls
//         // await  listDatabases(client);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// main().catch(console.error);