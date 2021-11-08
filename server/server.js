const express = require("express");
const fs = require("fs");

const app = express();

const axios = require("axios");

const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")));

app.post("/updatedata", (req, res) => {
  fs.writeFile("data.json", JSON.stringify(req.body.data), (err) => {
    if (err) console.log("Error writing file:", err);
  });

  res.json({ message: "Data sheet has been updated successfully!" });
});

app.get("/api/applications", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) throw err;

    let parsedData;
    if (data != [] && data !== undefined && data !== null) {
      parsedData = JSON.parse(data);
    }

    res.status(200).json(parsedData);
  });
});

app.post("/api/getlinkedin", async (req, res) => {
  const url = req.body.link;

  let response = "";

  if (url !== "") {
    response = await axios(url)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  res.status(200).send(response);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
