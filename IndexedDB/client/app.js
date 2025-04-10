

// Oprette Databasen med et field som hedder "KeyID" og et field som hedder "temperatur" som indeholder alle de temperature som vi får fra api'en fielden "temperatur" er også blevet indexeret så vi lettere og hurtigere kan søge efter bestemte data-værdier.
var db;
var request = indexedDB.open ("temperatur", 1);

request.onerror = function(event) {
    console.log("Fejl: " + event.target.errorCode);
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("Database oprettet eller åbnet!");
};

request.onupgradeneeded = function(event) {
    var upgrade = event.target.result;
    var temperaturStore = upgrade.createObjectStore("temperaturStore", { keyPath: "keyID", autoIncrement: true });
    temperaturStore.createIndex("temperaturIndeks", "temperatur");
    console.log("Objektbutik og indeks oprettet");
}

// 🔻 Tilføj dette lige efter din onupgradeneeded-blok:
function gemTemperaturIDB (navn, temp) {
    if (!db) return;
  
    const transaction = db.transaction(["temperaturStore"], "readwrite");
    const store = transaction.objectStore("temperaturStore");
  
    const data = {
      navn: navn,
      temperatur: temp,
      timestamp: new Date().toISOString()
    };
  
    store.add(data);
  };
  

// -----------------------------//

const API_KEY = "34486dd2be6a3af48920bf63c5be62e5"; // Din API-nøgle

const hentTemperaturer = async (byer) => {
  try {
    // Henter temperaturer for alle byer samtidig ved hjælp af Promise.all
    const temperaturer = await Promise.all(
      byer.map(async (by) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${by}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorData = await response.json(); // Hent API fejlmeddelelse
          throw new Error(`Fejl ved hentning af ${by}: ${errorData.message}`);
        }

        const data = await response.json();

        // Returner kun temp og name
        const { temp } = data.main;
        const { name } = data;

        // Gem i IndexedDB
        gemTemperaturIDB(name, temp);

        // Log kun de relevante data
        console.log(`Temperatur for ${name}:`, temp);

        return { name, temp };
      })
    );

    // Log temperaturerne for alle byer
    console.log("Temperaturer for alle byer:", temperaturer);

    // Hvis alt er ok, kan du opdatere visningen (f.eks. vise diagrammet)
    visualiserTemperaturer(temperaturer);

  } catch (error) {
    console.error("Fejl ved API-kald:", error);
  }
};

// -----------------------------//

const visualiserTemperaturer = (temperaturer) => {
    const canvas = document.getElementById("diagramCanvas");
    const ctx = canvas.getContext("2d");
  
    // Ryd tidligere tegninger
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const bredde = 60;
    const afstand = 20;
    const bund = canvas.height - 30;
  
    const farver = ["green", "yellow", "orange", "red"];
    const sorterede = [...temperaturer].sort((a, b) => a.temp - b.temp);
    const maxTemp = Math.max(...sorterede.map(obj => obj.temp));
  
    sorterede.forEach((byObj, index) => {
      const højde = (byObj.temp / maxTemp) * (canvas.height - 60);
      const x = index * (bredde + afstand) + 40;
      const y = bund - højde;
  
      // Søjle
      ctx.fillStyle = farver[index];
      ctx.fillRect(x, y, bredde, højde);
  
      // Temperatur-værdi
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.fillText(`${byObj.temp}°C`, x + 5, y - 10);
  
      // Bynavn
      ctx.fillText(byObj.name, x, canvas.height - 10);
    });
  };  

// -----------------------------//

// Håndtering af klik på knappen
document.getElementById("hentData").addEventListener("click", () => {
  // Hent byer fra inputfelterne
  const by1 = document.getElementById("by1").value;
  const by2 = document.getElementById("by2").value;
  const by3 = document.getElementById("by3").value;
  const by4 = document.getElementById("by4").value;

  // Saml byerne i en array
  const byer = [by1, by2, by3, by4].filter(Boolean); // Fjern tomme felter

  if (byer.length !== 4) {
    alert("Indtast præcis 4 byer!");
    return;
  }

  // Kald funktionen for at hente temperaturdata
  hentTemperaturer(byer);
});
