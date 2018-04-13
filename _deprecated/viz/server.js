var express = require("express");
var app     = express();
var http 	  = require("http");
// var path    = require("path");
// var fs 	    = require("fs");
var port 	  = "8080";
var data    = require(__dirname + "/idealdata.json");

http.Server(app);
app.use(express.static(__dirname + "/public"));
// Define the port to run on
app.set("port", port);
// Listen for requests
app.get("/", function (req, res) {
  res.sendFile("index.html");
});
app.post("/", function (req, res) {
  res.json(data);
});
app.listen(port, function() {
  console.log("Example app listening on port " + port);
});
console.log("Server Initialized");