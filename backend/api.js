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

app.get("/api/testcors", async (req, res) => {
  const url =
    "https://www.linkedin.com/jobs/collections/recommended/?currentJobId=2787158647&distance=&f_AL=&f_BE=&f_C=&f_CF=&f_CR=&f_CT=&f_E=&f_EA=&f_EL=&f_ES=&f_ET=&f_F=&f_FCE=&f_GC=&f_I=&f_JIYN=&f_JT=&f_LF=&f_PP=&f_SB=&f_SB2=&f_SB3=&f_T=&f_TP=&f_TPR=&f_WRA=&f_WT=&latLong=&refresh=false&sortBy=&start=0";
  const url2 = "https://www.linkedin.com/jobs/view/2787158647";

  const response = await axios(url2)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  res.status(200).send(response);
});

const PORT = 8080;

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`));
