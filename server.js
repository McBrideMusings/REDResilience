const express           = require("express");
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');
const bodyParser = require("body-parser");
const dateFormat = require('dateformat');
const doc = new GoogleSpreadsheet('13CzpEoPA2bxh6w-heRgog5pejYQ_uttE1qVtI3TWwIc');
const data    = require(__dirname + "/data.json");

const app = express();
var sheet;
app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("/", function (req, res) {
  res.send("test");
  setAuth();
});


function getInfoAndWorksheets() {
  doc.getInfo(function(err, info) {
    console.log('Loaded doc: '+info.title+' by '+info.author.email);
    sheet = info.worksheets[3];
  });
}

app.get("/test", function (req, res) {
  //res.sendFile(filebuffer); // I'd like to figure out the fs system but it never worked for me
  res.json(data);
  //res.json(filebuffer);
});

app.post("/", (req, res) => {
  res.json(data);
});

app.get("/data", (req, res) => {

  doc.getInfo(function (err, info) {
    mySheet.getCells( {
      'min-row':1,
      'max-row':8,
      'max-col': 2,
      'min-col': 2,
      'return-empty': true
    }, function (err, cells) {
      res.json(data);
    });
  });
});

app.post("/addViolations", (req, res) =>{
  doc.getInfo(function (err, info) {
    let mySheet = info.worksheets.find(x => x.id === req.body.id);
    var ts = dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
    mySheet.addRow({
      Timestamp: ts,
      Code_violation: req.body.data.codeviolation,
      Code_number: req.body.data.codenumber
    }, function () {
      console.log("done");
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

console.log("Server Initialized");

function setAuth() {
  var creds = require('./master-creds.json');
  doc.useServiceAccountAuth(creds, getInfoAndWorksheets);
}
function getTimestamp(){
  var localTime = new Date(); //get your local time
  var utcTime = localTime.getUTCHours(); // find UTC hours
  var estTime = new Date(); // create a new date object for the EST time
  estTime.setHours(utcTime-5); // adjust it for EST hours.
  return estTime;
}
setAuth();