const tesseract = require("node-tesseract-ocr");
const path = require("path");

const config = {
  lang: "tha+eng",
  oem: 1,
  psm: 3,
};
console.log("ddd11111");
console.log("🚀 ~ getOcr ~ __dirname:", __dirname);
const getOcr = async () => {
  // Set the path to the image in the local "image" folder
  const img = path.join(__dirname, "image", "กองทุน.jpg"); // Change "your-image.jpg" to the actual file name

  tesseract
    .recognize(img, config)
    .then((text) => {
      console.log("Result:", text);

      const regex =
        /เงินลงทุน \(บาท\):\s*(\d+(?:,\d{3})*(?:\.\d{2})?)\s+กองทุน:\s*(T\w+-\w+)/;

      const match = text.match(regex);

      if (match) {
        const investmentAmount = match[1]; // This will capture the amount (e.g., "2,000.00")
        const fundName = match[2]; // This will capture the fund name (e.g., "TUSEQ-UH")

        console.log("Investment Amount:", investmentAmount);
        console.log("Fund Name:", fundName);
      } else {
        console.log("No match found.");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = { getOcr };
