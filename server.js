"use strict";
require('dotenv').config()
// libraries
const port              = process.env.PORT;
const express           = require("express");
const bodyParser        = require('body-parser');
const multer            = require('multer');
const uuidv4            = require('uuid/v4');
const cors              = require('cors');
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');

const dateFormat        = require('dateformat');
//const {google}          = require('googleapis');
//const drive             = google.drive('v3');
const DriveUpload       = require('./server/driveupload');


// config
const maxFileSize = 10000000000; // Might be total across all uploaded files
const maxNumFiles = 10;

// setup
var sheet;
const creds = require('./master-creds.json');
const data = require(__dirname + "/data.json");
const doc = new GoogleSpreadsheet('1AEvI_VAcKss93_angVXQowdvnjL8u0diIjLsO3vnlJs');
const dataDoc = new GoogleSpreadsheet('13CzpEoPA2bxh6w-heRgog5pejYQ_uttE1qVtI3TWwIc');

const client = new DriveUpload(creds);

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, `${__dirname}/public/uploads/`);
  },
  filename: (req, file, cb) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxFileSize }
});

const app = express();
app.use(express.static( `${__dirname}/client/build/` ) );
//app.use(express.static( `${__dirname}/client/build` ) );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// GET 
app.get('*', (req, res)=>{
  res.send("working!");
  //res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

// POST
app.post('/upload', (req, res) => {
  upload.array("userPhoto", maxNumFiles)(req,res,function(err) {
    /*
      We now have a new req.file object here. At this point the file has been saved
      and the req.file.filename value will be the name returned by the
      filename() function defined in the diskStorage configuration. Other form fields
      are available here in req.body.
    */
    if(err) {
      res.status(500).send({ error: err.code });
      return res.end();
    }
    let fileNames = [];
    for (let i = 0; i < req.files.length; i++) {
      // This is possibly what we want in production
      // fileNames[i] = req.files[i].destination+req.files[i].filename;
      fileNames[i] = req.files[i].filename;
    }
    res.json({files: fileNames});
  });
});

app.post('/images', function (req, res) {
  var imgArray = [];
  fs.readdir(`${__dirname}/public/uploads/`, (err, files) => {
    files.forEach(file => {
      var str = "/public/uploads/"+file;
      // var str = `${__dirname}/client/public/img/`+file;
      imgArray.push(str);
    });
    res.send(imgArray);
  });
});

app.post("/data", (req, res) => {
  setAuth(function(){
    console.log("authenticated");
    doc.getInfo(function(err, data) {
      if (data === undefined) {
        console.log(err);
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

app.post("/deleteImg", (req, res) => {
  console.log(req.body.path);
  var s = `${__dirname}/client/public/${req.body.path}`;
  fs.unlink(s);
  res.send("done");
});

app.post("/addViolations", (req, res) =>{
  setAuthData(function () {
    dataDoc.getInfo(function (err, info) {
      let mySheet = info.worksheets.find(x => x.title === "RawData");

      if(req.body.violationData.isResolved == undefined){
        req.body.violationData.isResolved = false;
      }
      req.body.url = "./client/public"+req.body.url;
      var promise = client.Upload(req.body.url, req.body.concatAddress,req.body.violationData.name, req.body.violationData.isResolved);      
      promise.then(function (resolved) {
        console.log(resolved);
      });
      var ts = dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
      mySheet.addRow({
        Street_Number: req.body.houseData.streetNumber,
        Street_Name: req.body.houseData.streetName,
        City: req.body.houseData.city,
        State: req.body.houseData.state,
        Zip: req.body.houseData.zip,
        Full_Address: req.body.houseData.fullAddress,
        Timestamp: ts,
        Code_violation: req.body.violationData.name,
        One_to_Three_Months: req.body.violationData.monthsOne,
        Four_to_Six_Months: req.body.violationData.monthsFour,
        Over_Six_Months: req.body.violationData.monthsSix,
        Location_Front: req.body.violationData.front,
        Location_Back: req.body.violationData.back,
        Location_Side: req.body.violationData.side,
        Comments: req.body.violationData.comments,
        Is_Resolved: req.body.violationData.isResolved
      }, function () {
        console.log("done");
        res.send("done");
      });
    });
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

function getTimestamp(){
  var localTime = new Date(); //get your local time
  var utcTime = localTime.getUTCHours(); // find UTC hours
  var estTime = new Date(); // create a new date object for the EST time
  estTime.setHours(utcTime-5); // adjust it for EST hours.
  return estTime;
}

function setAuth(callback) {
  doc.useServiceAccountAuth(creds, callback);
}
function setAuthData(callback) {
  dataDoc.useServiceAccountAuth(creds, callback);
}
function formatFullAddress(streetNumber,streetName,city,state,zip) {
  return streetNumber+" "+streetName+" "+city+", "+state+" "+zip;
}



