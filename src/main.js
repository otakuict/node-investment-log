const express = require("express");
const cors = require("cors"); // Import cors
const multer = require("multer");

const app = express();
const port = 4000;

const ocr = require("./ocr");
const servies = require("./services/index");

// Use multer's memoryStorage to store the file in memory (as a buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(
  cors()
);

// Handle POST requests for processing image without saving to disk
app.post("/upload", upload.single("image"), async (req, res) => {
  const { label, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No image file uploaded" });
  }

  if (!label || !category) {
    return res.status(400).json({ message: "Label and category are required" });
  }

  // File data is available in req.file.buffer (file is stored in memory)
  const imageBuffer = req.file.buffer;

  // You can pass imageBuffer, label, and category to your processing function
  const resp = await ocr.getOcr(imageBuffer);

  const filePath = "./data.json";
  const prev = await servies.readJsonFile(filePath);

  const id = prev.length + 1;
  resp.created_at = new Date();
  resp.id = id;

  prev.push(resp);

  await servies.writeJsonFile(filePath, prev);

  // Respond with success message
  return res.status(200).json(resp);
});

app.get("/get-ocr", async (req, res) => {
  await res.json(resp);
});

app.get("/getlogs", async (req, res) => {
  const resp = await servies.getlogs();
  return res.status(200).json(resp);
});
//
app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});

const a = { a: 1 };
console.log({ ...a, ...{ p: 1 } });
