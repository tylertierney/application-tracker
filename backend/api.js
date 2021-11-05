const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.post("/updatedata", (req, res) => {
  fs.writeFile("data.json", JSON.stringify(req.body.data), (err) => {
    if (err) console.log("Error writing file:", err);
  });

  res.json({ message: "Data sheet has been updated successfully!" });
});

app.get("/", (req, res) => {
  console.log(req);
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) throw err;

    const parsedData = JSON.parse(data);

    res.json({ data: parsedData });
  });
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
