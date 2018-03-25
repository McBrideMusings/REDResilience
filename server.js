"use strict";
const express           = require("express");
const bodyParser        = require('body-parser');
const fileUpload        = require('express-fileupload');
const cors              = require('cors');
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');
const bodyParser = require("body-parser");
const dateFormat = require('dateformat');
const doc               = new GoogleSpreadsheet('1AEvI_VAcKss93_angVXQowdvnjL8u0diIjLsO3vnlJs');
const dataDoc           = new GoogleSpreadsheet('13CzpEoPA2bxh6w-heRgog5pejYQ_uttE1qVtI3TWwIc');
const data              = require(__dirname + "/data.json");
const creds             = require('./master-creds.json');
var sheet;


const app = express();

app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
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
  setAuth(function(){
    console.log("authenticated");
    // It's probably bad to do this many nested callbacks? Should we construct this a different way?
    doc.getInfo(function(err, data) { 
      if (data === undefined) {
        res.send(err);
      } else {
        let sheetList = {};
        const sheetZero = data.worksheets[0];
        sheetZero.getRows({
          offset: 1
        }, function( err, rows ) {
          let metaData = [];
          for (let index = 0; index < rows.length; index++) {
            const cell = rows[index];
            metaData[index] = {};
            metaData[index].id = index;
            metaData[index].streetNumber = cell.streetnumber;
            metaData[index].streetName = cell.streetname;
            metaData[index].city = cell.city;
            metaData[index].state = cell.state;
            metaData[index].zip = cell.zip;
            metaData[index].fullAddress = formatFullAddress(cell.streetnumber,cell.streetname,cell.city,cell.state,cell.zip);
          }
          res.send(metaData);
        });
      }
    });
  });
});

app.post("/addViolations", (req, res) =>{
  setAuthData(function () {
    dataDoc.getInfo(function (err, info) {
      let mySheet = info.worksheets.find(x => x.title === "RawData");
      //let mySheet = info.worksheets[req.body.id];
      var ts = dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
      mySheet.addRow({
        Street_Number: req.body.id.streetNumber,
        Street_Name: req.body.id.streetName,
        City: req.body.id.city,
        State: req.body.id.state,
        Zip: req.body.id.zip,
        Full_Address: req.body.id.fullAddress,
        Timestamp: ts,
        Code_violation: req.body.data.codeviolation,
        Code_number: req.body.data.codenumber
      }, function () {
        console.log("done");
      });
    });
  });
});

app.post(('/upload'), (req, res) => {
  console.log('upload endpoint hit');
  let imageFile = req.files.file;
  imageFile.mv(`${__dirname}/public/${req.body.filename}`, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({file: `${req.body.filename}`});
  });
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});


console.log("Server Initialized");

// function setAuth() {
//   var creds = require('./master-creds.json');
//   doc.useServiceAccountAuth(creds, getInfoAndWorksheets);
// }
function getTimestamp(){
  var localTime = new Date(); //get your local time
  var utcTime = localTime.getUTCHours(); // find UTC hours
  var estTime = new Date(); // create a new date object for the EST time
  estTime.setHours(utcTime-5); // adjust it for EST hours.
  return estTime;
}
//setAuth();

function setAuth(callback) {
  doc.useServiceAccountAuth(creds, callback);
}
function setAuthData(callback) {
  dataDoc.useServiceAccountAuth(creds, callback);
}
function formatFullAddress(streetNumber,streetName,city,state,zip) {
  return streetNumber+" "+streetName+" "+city+", "+state+" "+zip;
}

