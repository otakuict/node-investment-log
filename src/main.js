const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const port = 4000;

const ocr = require("./ocr");

app.use(
  cors({
    origin: "http://localhost:3001", // Allow only requests from the frontend
  })
);

app.get("/get-ocr", async (req, res) => {
  const resp = await ocr.getOcr();
  await res.json(resp);
});
//
app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
//sdf
