const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Hejsel:benjaminsimonmikkel1995@benjamins@benjamins-cluster.4qkao.mongodb.net/?appName=Benjamins-Cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function read() {
    try {
      await client.connect();
      const db = client.db("starwars");
      const collection = db.collection("personer");
  
      // 🔍 Find ét dokument baseret på navn
      const leia = await collection.findOne({ navn: "Leia Organa" });
      console.log("Leia Organa:", leia);
  
      // 🔍 Find alle dokumenter (alle personer)
      const allePersoner = await collection.find({}).toArray();
      console.log("Alle personer:", allePersoner);
  
      // 🔍 Find alle kvinder
      const kvinder = await collection.find({ køn: "Kvinde" }).toArray();
      console.log("Alle kvinder:", kvinder);
  
      // 🔍 Find alle mænd under 20 år, der bor på Tatooine
      const mændUnder20PåTatooine = await collection.find({
        køn: "Mand",
        alder: { $lt: 20 },
        planet: "Tatooine"
      }).toArray();
      console.log("Mænd under 20 år fra Tatooine:", mændUnder20PåTatooine);
  
    } finally {
      await client.close();
    }
}
  
read().catch(console.dir);