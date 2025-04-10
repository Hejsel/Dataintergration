const fs = require("fs");
let offset = 0, xmlData;
async function validateXML(xmlContent) {
    const formData = new FormData();
    formData.append("file", xmlContent);
    formData.append("filename", "xml");
    formData.append("target", "xmlvalidationorig/...");
    formData.append("counter", "2");
}