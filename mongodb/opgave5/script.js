const https = require('https');

// MongoDB forbindelse
const uri = "mongodb+srv://Hejsel:benjaminsimonmikkel1995@benjamins-cluster.4qkao.mongodb.net/?appName=Benjamins-Cluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const CVR_API_BASE = "https://cvrapi.dk/api?search=";

// Funktion til at streame XML-filen og parse data
async function streamXMLAndSave() {
  try {
    await client.connect();
    const db = client.db("fødevarestyrelsen");
    const collection = db.collection("firmaer");

    // Stream XML filen
    https.get("https://www.foedevarestyrelsen.dk/Media/638212360788086849/Smiley_xml.xml", (res) => {
      let xmlData = '';

      res.on('data', (chunk) => {
        xmlData += chunk;
      });

      res.on('end', async () => {
        // Parse XML data (løsning uden tredjeparts pakker som fast-xml-parser)
        const parsedData = parseXML(xmlData);
        
        for (const firma of parsedData.firmaer) {
          // Hent CVR-oplysninger for hver virksomhed
          const cvrData = await fetchCVRData(firma.cvrnr);

          // Forbered dokumentet til MongoDB
          const firmaDocument = {
            navn1: firma.navn1,
            cvrnr: firma.cvrnr,
            seneste_kontrol_dato: firma.seneste_kontrol_dato,
            naestseneste_kontrol_dato: firma.naestseneste_kontrol_dato,
            virksomhedsejer: cvrData.owner || "Ukendt",
            antal_ansatte: cvrData.employees || "Ukendt"
          };

          // Indsæt firmaet i MongoDB
          await collection.insertOne(firmaDocument);
        }

        console.log('Alle firmaer er blevet gemt i MongoDB.');
        
        // Beregn den gennemsnitlige tid mellem seneste og næstseneste kontrol
        await calculateAverageTimeBetweenKontrols(collection);
      });
    });
  } catch (error) {
    console.error("Fejl under streaming og lagring af data:", error);
  } finally {
    await client.close();
    console.log('MongoDB forbindelse lukket.');
  }
}

// Funktion til at hente CVR-data fra CVR API'et
async function fetchCVRData(cvrnr) {
  return new Promise((resolve, reject) => {
    https.get(`${CVR_API_BASE}${cvrnr}&country=dk`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const cvrInfo = JSON.parse(data);
          resolve({
            owner: cvrInfo?.owner || null,
            employees: cvrInfo?.employees || null
          });
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Funktion til at beregne gennemsnitlig tid mellem kontrolbesøg
async function calculateAverageTimeBetweenKontrols(collection) {
  const firmaer = await collection.find({}).toArray();
  let totalTid = 0;
  let count = 0;

  firmaer.forEach(firma => {
    const senesteDato = new Date(firma.seneste_kontrol_dato);
    const naesteDato = new Date(firma.naestseneste_kontrol_dato);

    // Beregn tid mellem kontrolbesøg i dage
    const timeDifference = (senesteDato - naesteDato) / (1000 * 3600 * 24);
    
    if (!isNaN(timeDifference)) {
      totalTid += timeDifference;
      count++;
    }
  });

  const gennemsnitTid = totalTid / count;
  console.log(`Den gennemsnitlige tid mellem kontrolbesøg er ${gennemsnitTid.toFixed(2)} dage.`);
}

// Kald funktionen
streamXMLAndSave();
