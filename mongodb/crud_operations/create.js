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

async function create() {
  try {
    await client.connect();
    const db = client.db("starwars");
    const collection = db.collection("personer");
    
    const personer = [
        {
            navn: "Luke Skywalker",
            køn: "Mand",
            alder: "53",
            arbejde: "Jedi-ridder"
        },
        {
            navn: "Darth Vader",
            køn: "Mand",
            alder: "45",
            arbejde: "Sith-lord"
        },
        {
            navn: "Leia Organa",
            køn: "Kvinde",
            alder: "54",
            arbejde: "Senator"
        },
        {
            navn: "Yoda",
            køn: "Mand",
            alder: "900",
            arbejde: "Jedi-mester"
        }
    ];

    const result = await collection.insertMany(personer);
    console.log(`${result.insertedCount} dokumenter tilføjet.`);
    console.dir(result.insertedIds);
    
  } finally {
    await client.close();
  }
}
create().catch(console.dir);


