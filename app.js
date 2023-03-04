const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;

  res.sendFile(__dirname + "/success.html");
});

app.listen(505, function () {
  console.log("Server running locally on port [ 505 ]");
});
