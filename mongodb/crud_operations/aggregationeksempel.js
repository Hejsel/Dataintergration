const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Hejsel:benjaminsimonmikkel1995@benjamins-cluster.4qkao.mongodb.net/?appName=Benjamins-Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function aggregateData() {
  try {
    await client.connect();
    console.log('Connected to the database.');
    const db = client.db("starwars");
    const collection = db.collection("personer");

    // Tjek om der er nogen dokumenter i collectionen
    const count = await collection.countDocuments();
    if (count === 0) {
      console.log('No documents found in the collection.');
      return;
    }
    console.log(`Found ${count} documents in the collection.`);

    // Udskriv alle dokumenter for at kontrollere dataene
    const allDocuments = await collection.find({}).toArray();
    console.log('All documents:', allDocuments);

    // Aggregering pipeline
    let pipeline = [];
    // Først konverter alder til et tal og filtrer personer under 50 år
    pipeline.push({
      $addFields: {
        alder: { $toInt: "$alder" }
      }
    });
    pipeline.push({ $match: { alder: { $lt: 50 } } });  // Filtrer personer under 50 år
    pipeline.push({ $group: { _id: '$øjenfarve', count: { $sum: 1 } } });  // Gruppér efter øjenfarve og tælle antal
    pipeline.push({ $project: { _id: 0, øjenfarve: '$_id', count: 1 } });  // Omformater resultatet

    // Kør aggregering
    const result = await collection.aggregate(pipeline).toArray();
    console.log('Aggregation result:', result);

    if (result.length === 0) {
      console.log('No results found in the aggregation.');
      return;
    }

    // Udskriv resultaterne
    console.log('Aggregation results:');
    result.forEach(e => {
      console.log(`${e.øjenfarve}: ${e.count}`);
    });

  } catch (error) {
    console.error('Error during aggregation:', error);
  } finally {
    await client.close();
    console.log('Connection closed.');
  }
}

aggregateData();
