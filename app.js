const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const { json } = require("body-parser");

const app = express();

const mailchimpKey = "933ea41966568999a6b06bad88b7b0d0-us11";
const id = "430cadcd9f";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us11.api.mailchimp.com/3.0/lists/430cadcd9f";
  const options = {
    method: "POST",
    auth: "nikola:933ea41966568999a6b06bad88b7b0d0-us11",
  };
  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

  res.sendFile(__dirname + "/success.html");
});

app.listen(505, function () {
  console.log("Server running locally on port [ 505 ]");
});
