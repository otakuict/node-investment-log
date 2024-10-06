const tesseract = require("node-tesseract-ocr");
const path = require("path");

const config = {
  lang: "tha+eng",
  oem: 1,
  psm: 3,
};

const getOcr = async () => {
  let mutualFundName = "";
  let amount = 0;

  // Set the path to the image in the local "image" folder
  const img = path.join(__dirname, "image", "ehd.jpg");

  try {
    // Wait for tesseract to finish recognizing the text
    const text = await tesseract.recognize(img, config);
    console.log("Result:", text);

    // Match the amount using regex
    const regex = /เงินลงทุน \(บาท\)\s+([\d,]+\.\d{2})/;
    const match = text.match(regex);
    if (match) {
      amount = match[1].replace(/,/g, ""); // remove commas
      console.log("test_regex", amount); // outputs: 2000
    } else {
      console.log("No match found");
    }

    // Extract mutual fund name
    const mutualFundRegex = /เลขที่บัญชี\s+\d+\s+([A-Z0-9\-()]+)/;
    const mutualFundMatch = text.match(mutualFundRegex);
    if (mutualFundMatch) {
      mutualFundName = mutualFundMatch[1];
      console.log("Mutual Fund Name:", mutualFundName); // Outputs: TUSEQ-UH
    } else {
      console.log("No mutual fund name found");
    }
  } catch (error) {
    console.log(error.message);
  }

  return { name: mutualFundName, value: amount };
};

module.exports = { getOcr };
