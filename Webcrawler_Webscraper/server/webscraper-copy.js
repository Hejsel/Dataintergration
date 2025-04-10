const https = require('https');

// Grundlæggende funktion til at hente HTML
function hentHTML(urlLinks, callback) {
  https.get(urlLinks, (res) => {
    let html = '';

    if (res.statusCode !== 200) {
      console.log(`Fejl ved hentning af ${urlLinks}: Statuskode ${res.statusCode}`);
      return;
    }

    res.on('data', (chunk) => {
      html += chunk;
    });

    res.on('end', () => {
      console.log('__________________________');
      console.log(`HTML hentet fra ${urlLinks}`);
      callback(html, urlLinks);
    });

  }).on('error', (err) => {
    console.log('__________________________');
    console.log('Fejl:', err.message);
  });
};

// Funktion til at finde links i HTML
function findLinks(html, baseUrl) {
  const linksRegEx = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/g;
  let match;
  const links = [];

  while ((match = linksRegEx.exec(html)) !== null) {
    let link = match[1];

    // Hvis linket er relativt, tilføj base URL
    if (link.startsWith('/')) {
      link = baseUrl + link;
    }

    // Undgå duplikater
    if (!links.includes(link)) {
      links.push(link);
    }
  }

  return links;
};

// Funktion til at finde og logge medarbejderoplysninger baseret på klasser
function logMedarbejderOplysninger(html) {
  const navnRegEx = /<tr class="stom-medarbejder-title">\s*<td text_search="([^<]+)">\s*([^<]+)<\/td>\s*<\/tr>/
  const emailRegEx = /<tr class="stom-medarbejder-email">\s*<td><a href="mailto:([^<]+)">/
  const stillingRegEx = /<tr class="stom-medarbejder-stilling">\s*<td>([^<]+)<\/td>\s*<\/tr>/
  const phoneRegEx = /<a href="tel:([^"]+)">([^<]+)<\/a>/

  let match;

  console.log("Begynder at hente medarbejderoplysninger...");

  // Hent navn
  let foundName = false;
  while ((match = navnRegEx.exec(html)) !== null) {
    console.log(`Navn fundet: ${match[2]}`);  // Log navn
    foundName = true;
  }
  if (!foundName) {
    console.log("Ingen navne fundet.");
  }

  // Hent email
  let foundEmail = false;
  while ((match = emailRegEx.exec(html)) !== null) {
    console.log(`Email fundet: ${match[1]}`);  // Log email
    foundEmail = true;
  }
  if (!foundEmail) {
    console.log("Ingen email fundet.");
  }

  // Hent stilling
  let foundStilling = false;
  while ((match = stillingRegEx.exec(html)) !== null) {
    console.log(`Stilling fundet: ${match[1]}`);  // Log stilling
    foundStilling = true;
  }
  if (!foundStilling) {
    console.log("Ingen stilling fundet.");
  }

  // Hent telefonnummer
  let foundPhone = false;
  while ((match = phoneRegEx.exec(html)) !== null) {
    console.log(`Telefonnummer fundet: ${match[1]}`);  // Log telefonnummer
    foundPhone = true;
  }
  if (!foundPhone) {
    console.log("Ingen telefonnummer fundet.");
  }

  console.log("Medarbejderoplysninger hentet.");
}

// Funktion til at crawle links
function crawle(baseUrl) {
  const besogteLinks = new Set();

  function behandleLinks(urlLink) {
    if (!besogteLinks.has(urlLink)) {
      besogteLinks.add(urlLink);
      hentHTML(urlLink, (html, currentUrl) => {
        const links = findLinks(html, baseUrl);
        
        console.log('__________________________');
        console.log(`Fundne links på ${currentUrl}:`, links);

        // Log medarbejderoplysninger
        logMedarbejderOplysninger(html);

        links.forEach((link) => {
          behandleLinks(link);
        });
      });
    }
  };

  behandleLinks(baseUrl);
};

const baseUrl = 'https://iba.dk/fuldtidsuddannelser/vaelg-efter-interesse/'; // Erstat med din ønskede base-URL
crawle(baseUrl);
