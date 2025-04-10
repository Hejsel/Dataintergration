const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Hejsel:benjaminsimonmikkel1995@benjamins-cluster.4qkao.mongodb.net/?appName=Benjamins-Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function deletePersoner() {
  try {
    await client.connect();
    const db = client.db("starwars");
    const collection = db.collection("personer");

    // 🔹 Slet Benjamin og Simon fra databasen
    const result = await collection.deleteMany({
      navn: { $in: ["Benjamin", "Simon"] } // Sletter dokumenter, hvor navnet er enten "Benjamin" eller "Simon"
    });

    console.log(`${result.deletedCount} dokumenter slettet.`);

  } finally {
    await client.close();
  }
}

deletePersoner().catch(console.dir);
