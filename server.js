const express     = require("express");
const fs 	        = require("fs");
const path        = require('path');

const data    = require(__dirname + "/data.json");

const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/", function (req, res) {
  res.send("test");
});

app.get("/test", function (req, res) {
  //res.sendFile(filebuffer); // I'd like to figure out the fs system but it never worked for me
  res.json(data);
  //res.json(filebuffer);
});

app.post("/", (req, res) => {
  res.json(data);
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

console.log("Server Initialized");