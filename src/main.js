const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const port = 4000;

const ocr = require("./ocr");

app.use(
  cors({
    origin:
      "http://ec2-54-66-146-109.ap-southeast-2.compute.amazonaws.com:3001", // Allow only requests from the frontend
  })
);
console.log("action");
app.get("/get-ocr", async (req, res) => {
  const resp = await ocr.getOcr();
  await res.json(resp);
});
//
app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
