function validateFiles() {
  const schemaFile = document.getElementById('schemaFile').files[0];
  const jsonFile = document.getElementById('jsonFile').files[0];

  if (!schemaFile || !jsonFile) {
    document.getElementById('result').innerHTML = '<strong style="color: red;">❌ Vælg både skema- og JSON-filer!</strong>';
    return;
  }

  const readerSchema = new FileReader();
  const readerJson = new FileReader();

  // Når skemaet er indlæst, behandl JSON-filen
  readerSchema.onload = function() {
    const schema = JSON.parse(readerSchema.result);

    // Når JSON-filen er indlæst, validér mod skemaet
    readerJson.onload = function() {
      const json = JSON.parse(readerJson.result);

      try {
        const ajv = new Ajv();
        const validate = ajv.compile(schema);
        const valid = validate(json);

        let result;
        if (valid) {
          result = '<strong style="color: green;">✅ JSON er gyldig!</strong>';
        } else {
          result = `<strong style="color: red;">❌ JSON er ugyldig:</strong><ul>`;
          validate.errors.forEach(error => {
            result += `<li><strong>${error.instancePath || '(roden)'}</strong>: ${error.message}</li>`;
          });
          result += '</ul>';
        }

        document.getElementById('result').innerHTML = result;
      } catch (error) {
        console.error('Fejl under validering:', error);
        document.getElementById('result').innerHTML = '<strong style="color: red;">❌ Der opstod en fejl under validering!</strong>';
      }
    };

    // Læs JSON-filen
    readerJson.readAsText(jsonFile);
  };

  // Læs skema-filen
  readerSchema.readAsText(schemaFile);
}
