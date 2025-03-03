const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv();

// Hent kommandolinjeargumenter
const schemaFile = process.argv[2]; // Skemaet som første argument
const jsonFile = process.argv[3]; // JSON-filen som andet argument

if (!schemaFile || !jsonFile) {
  console.error("Brug: node validateCli.js <skema.json> <data.json>");
  process.exit(1);
}

// Læs og parse JSON-skema og data
const schema = JSON.parse(fs.readFileSync(schemaFile, 'utf-8'));
const data = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));

// Kompiler schemaet
const validate = ajv.compile(schema);

// Valider data
const valid = validate(data);

// Udskriv resultatet
if (valid) {
  console.log("✅ JSON er gyldig!");
} else {
  console.log("❌ JSON er ugyldig:", validate.errors);
}
