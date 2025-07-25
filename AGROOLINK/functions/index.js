const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  const {text} = req.body;

  let response = "";

  if (text === "") {
    response = `CON Welcome to AgroLinker 🌾
1. I have a problem
2. I can help`;
  } else if (text === "1") {
    response = `CON What problem are you facing?
1. Crop disease
2. Lack of tools
3. Market access`;
  } else if (text === "2") {
    response = `CON What can you help with?
1. Advice
2. Tools
3. Transport`;
  } else {
    response = "END Thank you for using AgroLinker 🙏";
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

exports.ussd = functions.https.onRequest(app);
