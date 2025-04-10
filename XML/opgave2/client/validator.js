const fs = require("fs");
const path = require("path");
const filsti = path.join(__dirname, "./data.xml");

const validérXML = (xml) => {
    const stack = [];
    const tags = xml.match(/<\/?[a-zA-Z][\w-]*>/g) || [];

    for (let tag of tags) {
        if (!tag.includes("/")) {
            stack.push(tag);
        } else if (stack.pop() !== tag.replace(/\//g, "")) {
            return false;
        }
    }

    return stack.length === 0;
};
try {
    const xmlData = fs.readFileSync(filsti, "utf8");
    const erGyldig = validérXML(xmlData);
    
    console.log(erGyldig ? "✅ XML er gyldig!" : "❌ XML er ugyldig!");
} catch (error) {
    console.error("Fejl ved læsning af fil:", error.message);
}
