// Denne fil bruges til at udføre treansformationen

const fs = require('fs');
const xslTekst = fs.readFileSync('filterJedi.xslt', 'utf8');
const xmlTekst = fs.readFileSync('starwars-data.xml', 'utf8');

const xsltProcessor = new XSLTProcessor();
const parser = new DOMParser();
const xsl = parser.parseFromString(xslTekst, "application/xml");
const xml = parser.parseFromString(xmlTekst, "application/xml");
xsltProcessor.importStylesheet(xsl);
const resultDocument = xsltProcessor.transformToFragment(xml, document);
console.log(new XMLSerializer().serializeToString(resultDocument));