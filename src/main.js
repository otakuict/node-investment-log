const express = require("express");
const app = express();
const port = 3000;

const ocr = require("./ocr");

app.get("/", async (req, res) => {
  await ocr.getOcr();
  await res.send("Hello World!");
});
//
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//sdf
