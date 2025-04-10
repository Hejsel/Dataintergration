const fs = require('fs');
const path = require('path');

// Funktion til at læse CSV-fil som en tekst
const parseCSV = (csvFil) => {
  const csvData = fs.readFileSync(csvFil, 'latin1');
  return csvData;
};

// Funktion til at konvertere CSV-data til XML
const konverterCSVtilXML = (csvFil, xmlFil) => {
  const csvData = parseCSV(csvFil);

  // Splitt CSV-data i linjer
  const rows = csvData.split('\n').filter(row => row.trim() !== ''); // Fjern tomme linjer

  // Antag første linje er headers
  const headers = rows[0].split(';').map(header => header.trim()); // Splitt og trim headers

  // Start XML-strukturen
  let xmlData = '<?xml version="1.0" encoding="UTF-8"?>\n<records>\n';

  // Loop gennem hver linje og opbyg XML-data
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(';').map(item => item.trim()); // Splitt og trim værdierne i rækken
    let rowData = '';

    // Byg XML for denne række
    for (let j = 0; j < headers.length; j++) {
      // Skab XML-tag for hver header og dens værdi
      rowData += `    <${headers[j]}>${row[j]}</${headers[j]}>\n`;
    }

    // Tilføj denne række til XML-data
    xmlData += `  <record>\n${rowData}  </record>\n\n`;
  }

  // Slut XML-strukturen
  xmlData += '</records>';

  // Gem XML til fil
  fs.writeFileSync(xmlFil, xmlData, 'utf-8');
  console.log(`XML er gemt i: ${xmlFil}`);
};

// Eksempel på brug
const csvFil = path.join(__dirname, 'Haltestellen.csv'); // Stien til CSV-filen
const xmlFil = path.join(__dirname, 'Haltestellen.xml'); // Stien til den resulterende XML-fil
konverterCSVtilXML(csvFil, xmlFil);
