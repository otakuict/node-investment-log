const fs = require("fs");
const path = require("path");

// Helper function to read the JSON file
async function readJsonFile(filePath) {
  const fullPath = path.resolve(__dirname, filePath); // Correctly resolve the file path
  const data = await fs.readFileSync(fullPath, "utf8"); // "utf8" should be passed here
  return JSON.parse(data);
}

// Helper function to write the updated JSON back to the file
async function writeJsonFile(filePath, data) {
  const fullPath = path.resolve(__dirname, filePath); // Correctly resolve the file path
  await fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), "utf8");
}

async function getlogs() {
  const filePath = "./data.json"; // Relative path to data.json

  // Step 1: Read the data from the JSON file
  let data = await readJsonFile(filePath);

  // Step 2: Sort the data based on the 'create_at' field to get the oldest entry
  const oldestEntry = data.sort(
    (a, b) => new Date(a.create_at) - new Date(b.create_at) // Sort in ascending order
  )[0];

  // Step 3: Remove the entire object that corresponds to the latest entry
  data = data.filter((entry) => entry.id !== oldestEntry.id); // Remove the object with the same id

  // Step 4: Write the updated data back to the JSON file
  await writeJsonFile(filePath, data);

  // Step 5: Return the removed entry
  return oldestEntry; // Return the entire removed entry
}

module.exports = { getlogs, writeJsonFile, readJsonFile };
