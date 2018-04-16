"use strict";
require('dotenv').config()
// libraries
const port              = process.env.PORT || 3000;
const express           = require("express");
const bodyParser        = require('body-parser');
const helmet            = require('helmet')
const multer            = require('multer');
const uuidv4            = require('uuid/v4');
const cors              = require('cors');
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');

const dateFormat        = require('dateformat');
//const {google}          = require('googleapis');
//const drive             = google.drive('v3');
const DriveUpload       = require('./driveupload');


// config
const maxFileSize = 10000000000;   // Might be total across all uploaded files
const maxNumFiles = 10;
const stagingUploadPath = "/client/build/uploads/";

// setup
var sheet;
const creds = require('./master-creds.json');
const data = require(__dirname + "/data.json");
const doc = new GoogleSpreadsheet('1KYZOVHZM7KVj0jVMx8H95jqPP3jjVC5vQUIewIRb33w');

const client = new DriveUpload(creds);


// confirm that the stagingUploadPath exists (build folder is deleted on npm run build)
console.log(mkdirSync(stagingUploadPath));

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    cb(null, __dirname+stagingUploadPath);
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
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// GET 
app.get('*', (req, res)=>{
  //res.send("working!");
  //res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

// POST
app.post('/password', function (req, res) {
  console.log(req.body.password);
  if (req.body.password === process.env.PASSWORD) {
    res.json({ result:"OK" });
  } else {
    res.json({ result:"BAD" });
  }
});

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
  console.log("here");
  setAuth(function(){
    console.log("authenticated");
    doc.getInfo(function(err, data) {
      console.log("also here");
      if (data === undefined) {
        console.log(err);
        res.send(err);
      } else {
        let sheetList = {};
        let mySheet = data.worksheets.find(x => x.title === "MetaData");
        console.log("here");
        mySheet.getRows({
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
  var s = `${__dirname}/client/build/${req.body.path}`;
  fs.unlink(s);
  res.send("done");
});

app.post("/deleteAllImg", (req, res) => {
  for(var i=0; i < req.body.data.length; i++){
    var s = `${__dirname}/client/build/${req.body.data[i]}`;
    fs.unlink(s);
  }
  res.send("done");
});

app.post("/addViolations", (req, res) =>{
    doc.getInfo(function (err, info) {
      console.log(req.body);
      var imgPaths = "";
      let mySheet = info.worksheets.find(x => x.title === "RawData");

      if(req.body.violationData.isResolved == undefined){
        req.body.violationData.isResolved = false;
      }
      if(req.body.images.length){
        for(var i=0; i < req.body.images.length; i++){
          req.body.images[i] = "./client/build"+req.body.images[i];
        }
        //req.body.url = "./client/public"+req.body.url;
        console.log(req.body.images);
        var promise = client.Upload(req.body.images, req.body.concatAddress, req.body.violationData.name, req.body.violationData.isResolved);
        promise.then(function (resolved) {
          console.log(resolved);
          for(var i=0; i < resolved.length; i++){
            imgPaths = imgPaths+" | "+resolved[i].webViewLink;
          }
          var ts = dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
          mySheet.addRow({
            Street_Number: req.body.houseData.streetNumber,
            Street_Name: req.body.houseData.streetName,
            City: req.body.houseData.city,
            State: req.body.houseData.state,
            Zip: req.body.houseData.zip,
            Full_Address: req.body.houseData.fullAddress,
            Single_Dwelling: req.body.propertyData.singleDwelling,
            Multifamily_Dwelling: req.body.propertyData.multiDwelling,
            Apartment: req.body.propertyData.isApt,
            Commercial: req.body.propertyData.isCommercial,
            Property_Owner_Name: req.body.propertyData.owner,
            Lives_There: req.body.propertyData.livesThere,
            Not_Lives_There: req.body.propertyData.notLivesThere,
            Timestamp: ts,
            Code_violation: req.body.violationData.name,
            One_to_Three_Months: req.body.violationData.monthsOne,
            Four_to_Six_Months: req.body.violationData.monthsFour,
            Over_Six_Months: req.body.violationData.monthsSix,
            Location_Front: req.body.violationData.front,
            Location_Back: req.body.violationData.back,
            Location_Side: req.body.violationData.side,
            Comments: req.body.violationData.comments,
            Is_Resolved: req.body.violationData.isResolved,
            IMG_URL: imgPaths
          }, function () {
            console.log("done");
            res.send("done");
          });
        });
        promise.catch(function (err) {
          console.log(err);
        })
      }
      else{
        var ts = dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
        mySheet.addRow({
          Street_Number: req.body.houseData.streetNumber,
          Street_Name: req.body.houseData.streetName,
          City: req.body.houseData.city,
          State: req.body.houseData.state,
          Zip: req.body.houseData.zip,
          Full_Address: req.body.houseData.fullAddress,
          Single_Dwelling: req.body.propertyData.singleDwelling,
          Multifamily_Dwelling: req.body.propertyData.multiDwelling,
          Apartment: req.body.propertyData.isApt,
          Commercial: req.body.propertyData.isCommercial,
          Property_Owner_Name: req.body.propertyData.owner,
          Lives_There: req.body.propertyData.livesThere,
          Not_Lives_There: req.body.propertyData.notLivesThere,
          Timestamp: ts,
          Code_violation: req.body.violationData.name,
          One_to_Three_Months: req.body.violationData.monthsOne,
          Four_to_Six_Months: req.body.violationData.monthsFour,
          Over_Six_Months: req.body.violationData.monthsSix,
          Location_Front: req.body.violationData.front,
          Location_Back: req.body.violationData.back,
          Location_Side: req.body.violationData.side,
          Comments: req.body.violationData.comments,
          Is_Resolved: req.body.violationData.isResolved,
          IMG_URL: imgPaths
        }, function () {
          console.log("done");
          res.send("done");
        });
      }
    } );
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

function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(__dirname+dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}


