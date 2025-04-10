const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Hejsel:benjaminsimonmikkel1995@benjamins-cluster.4qkao.mongodb.net/?appName=Benjamins-Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function updateAndProjectProperties() {
  try {
    await client.connect();
    const db = client.db("starwars");
    const collection = db.collection("personer");

    // 🔹 Tilføj hårfarve til alle kvinder
    const updateKvinder = await collection.updateMany(
      { køn: "Kvinde" },
      { $set: { hårfarve: "Brun" } }
    );
    console.log(`${updateKvinder.modifiedCount} kvinder fik tilføjet hårfarve.`);

    // 🔹 Tilføj øjenfarve til alle mænd
    const updateMænd = await collection.updateMany(
      { køn: "Mand" },
      { $set: { øjenfarve: "Blå" } }
    );
    console.log(`${updateMænd.modifiedCount} mænd fik tilføjet øjenfarve.`);

    // 🔹 Projektering af kvinder med hårfarve
    const kvinderMedHårfarve = await collection.find(
      { køn: "Kvinde" },
      { projection: { navn: 1, hårfarve: 1, _id: 1 } } // Vi viser kun navn og hårfarve, og _id
    ).toArray();
    console.log("Kvinder med hårfarve:", kvinderMedHårfarve);

    // 🔹 Projektering af mænd med øjenfarve
    const mændMedØjenfarve = await collection.find(
      { køn: "Mand" },
      { projection: { navn: 1, øjenfarve: 1, _id: 0 } } // Vi viser kun navn og øjenfarve, ikke _id
    ).toArray();
    console.log("Mænd med øjenfarve:", mændMedØjenfarve);

  } finally {
    await client.close();
  }
}

updateAndProjectProperties().catch(console.dir);
