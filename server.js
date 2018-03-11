"use strict";
const express           = require("express");
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');

const doc               = new GoogleSpreadsheet('1AEvI_VAcKss93_angVXQowdvnjL8u0diIjLsO3vnlJs');
const data              = require(__dirname + "/data.json");
const creds             = require('./master-creds.json');
var sheet;

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

app.get("/data", (req, res) => {
  setAuth(function(){
    console.log("authenticated");
    doc.getInfo(function(err, data) {
      if (data === undefined) {
        res.send(err);
      } else {
        let sheetList = [];
        //res.send(data.worksheets);
        /*
        for (let index = 0; index < data.worksheets.length; index++) {
          const element = array[index];
          sheetList.push(element.id);
        }
        console.log(sheetList);
        res.send(sheetList);
        */
       data.worksheets[0].GetRow("A")
      }
    });
  });
  /*
  getInfoAndWorksheets(function(data) {
    res.json(data);
  });
  */
});

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

function setAuth(callback) {
  doc.useServiceAccountAuth(creds, callback);
}