const express = require("express");
const fs = require("fs");

const app = express();

const axios = require("axios");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/updatedata", (req, res) => {
  fs.writeFile("data.json", JSON.stringify(req.body.data), (err) => {
    if (err) console.log("Error writing file:", err);
  });

  res.json({ message: "Data sheet has been updated successfully!" });
});

app.get("/api/applications", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) throw err;

    const parsedData = JSON.parse(data);

    res.status(200).json(parsedData);
  });
});

app.post("/api/getlinkedin", async (req, res) => {
  console.log(req);

  const url = req.body.link;

  const response = await axios(url)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  res.status(200).send(response);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
