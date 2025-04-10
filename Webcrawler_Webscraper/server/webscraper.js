const https = require("https");

// Funktion til at hente HTML
const hentHTML = (url) => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        const location = res.headers["location"];
        console.log(`Omdirigeret til: ${location}`);
        return resolve(hentHTML(location)); // Følg omdirigeringen
      }

      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
    });

    req.on("error", (err) => reject(`Fejl under anmodning: ${err.message}`));
  });
};

// Funktion til at scrape underviserdata fra HTML
const scrapeUnderviserData = (html) => {
  const navnMatch = html.match(
    /<tr class="stom-medarbejder-title">\s*<td text_search="([^<]+)">\s*([^<]+)<\/td>\s*<\/tr>/
  );
  const navn = navnMatch ? navnMatch[2].trim() : "";

  const [fornavn, ...rest] = navn.split(" ");
  const efternavn = rest.pop() || "";
  const mellemnavne = rest.join(" ");

  const emailMatch = html.match(
    /<tr class="stom-medarbejder-email">\s*<td><a href="mailto:([^<]+)">/
  );
  const email = emailMatch ? emailMatch[1].trim() : "";

  const telefonMatch = html.match(
    /<a href="tel:([^"]+)">([^<]+)<\/a>/
  );
  const telefon = telefonMatch ? telefonMatch[2].trim() : "";

  const stillingMatch = html.match(
    /<tr class="stom-medarbejder-stilling">\s*<td>([^<]+)<\/td>\s*<\/tr>/
  );
  const stilling = stillingMatch ? stillingMatch[1].trim() : "";

  return { fornavn, mellemnavne, efternavn, email, telefon, stilling };
};

// Find alle matches med regex
const findAllMatches = (html, regex) => {
  const matches = [...html.matchAll(regex)];
  return matches.map((m) => m[1].trim());
};

// Start Scraper
const startScraper = async () => {
  const baseUrl = "https://www.iba.dk/fuldtidsuddannelser/vaelg-efter-interesse";
  const html = await hentHTML(baseUrl);
  console.log("HTML hentet fra URL:", baseUrl);

  // Find alle unikke links til uddannelser
  const uddannelserLinks = [...new Set(findAllMatches(html, /<a class="interesseomraader--link--href"[^>]*href="([^"]+)"/g))];
  console.log("Unikke uddannelseslinks:", uddannelserLinks);

  const undervisere = new Map(); // Brug email som unik nøgle

  // Gennemgå hver uddannelsesside og scrap underviserdata
  for (const link of uddannelserLinks) {
    const underviserHTML = await hentHTML(link);
    const underviserData = scrapeUnderviserData(underviserHTML);

    // Undgå dubletter baseret på email
    if (!underviserData.email || undervisere.has(underviserData.email)) {
      console.log(`❌ Springer over dublet: ${underviserData.email}`);
      continue;
    }

    undervisere.set(underviserData.email, underviserData);
    console.log(`✔️ Tilføjet underviser: ${underviserData.fornavn} ${underviserData.efternavn}`);
  }

  console.log("\n🎉 Scraping færdig! Her er de unikke undervisere:\n");
  undervisere.forEach((underviser) => {
    console.log(`Fornavn: ${underviser.fornavn}`);
    console.log(`Mellemnavne: ${underviser.mellemnavne}`);
    console.log(`Efternavn: ${underviser.efternavn}`);
    console.log(`Email: ${underviser.email}`);
    console.log(`Telefon: ${underviser.telefon}`);
    console.log(`Stilling: ${underviser.stilling}`);
    console.log("---");
  });
};

// Kør scraperen
startScraper().catch((err) => {
  console.error("Fejl under scraping:", err);
});
