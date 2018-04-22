"use strict";
require('dotenv').config()
// libraries
const port              = process.env.PORT || 3000;
const express           = require("express");
const bodyParser        = require('body-parser');
const helmet            = require('helmet');
const multer            = require('multer');
const uuidv4            = require('uuid/v4');
const cors              = require('cors');
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');
const readChunk         = require('read-chunk'); // npm install read-chunk 
const imageType         = require('image-type');
const ExifImage         = require('exif').ExifImage;
const dateFormat        = require('dateformat');
//const {google}          = require('googleapis');
//const drive             = google.drive('v3');
const DriveUpload       = require('./driveupload');

// config
const maxFileSize = 10000000000;   // total in bytes of all uploaded folders in batch
const maxNumFiles = 10;
const stagingUploadPath = "/client/build/uploads/"; // Photos are uploaded to the server first, then Drive

// setup
var sheet;
const creds = require('./master-creds.json'); // This is a pre-formatted JSON auth file from Google
const data = require(__dirname + "/data.json");
const doc = new GoogleSpreadsheet(process.env.DRIVE_SPREADSHEETID || '1KYZOVHZM7KVj0jVMx8H95jqPP3jjVC5vQUIewIRb33w');

const client = new DriveUpload(creds);


// confirm that the stagingUploadPath exists (build folder is deleted on npm run build)
console.log(mkdirSync(stagingUploadPath));

// configure storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    /*
      Files will be saved in the 'uploads' directory. Make
      sure this directory already exists!
    */
    callback(null, __dirname+stagingUploadPath);
  },
  filename: (req, file, callback) => {
    /*
      uuidv4() will generate a random ID that we'll use for the
      new filename. We use path.extname() to get
      the extension from the original file name and add that to the new
      generated ID. These combined will create the file name used
      to save the file on the server and will be available as
      req.file.pathname in the router handler.
    */
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    callback(null, newFilename);
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
app.use(require('sanitize').middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('sanitize').middleware);

// GET 
app.get('*', (req, res)=>{
  //res.send("working!");
  //res.sendFile(path.join(__dirname, '/client/build/index.html'));
})

// POST
app.post('/password', function (req, res) {
  const pw = req.bodyString('password');
  if (pw === process.env.PASSWORD) {
    res.json({ result:"OK" });
  } else {
    res.json({ result:"BAD" });
  }
});

app.post('/upload', (req, res) => {
  // Sanitize
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

// Gets MetaData from Google Drive
app.post("/data", (req, res) => {
  setAuth(function(){
    console.log("authenticated");
    doc.getInfo(function(err, data) {
      if (data === undefined) {
        console.log(err);
        res.send(err);
      } else {
        let sheetList = {};
        let mySheet = data.worksheets.find(x => x.title === "MetaData");
        mySheet.getRows({
          offset: 1
        }, function( err, rows ) {
          let metaData = [];
          for (let index = 0; index < rows.length; index++) {
            const cell = rows[index];
            metaData[index] = {};
            metaData[index].id = index;
            metaData[index].custom = cell.custom;
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
      var imgPaths = "";
      let mySheet = info.worksheets.find(x => x.title === "RawData");
      //client.Upload needs a defined isResolved param. It comes in as undefined if the user doesn't check it on the form
      if(req.body.violationData.isResolved == undefined){
        req.body.violationData.isResolved = false;
      }
      //Checks if user has uploaded images so we know to call client.Upload(), etc
      if(req.body.images.length){
        //add the correct directory path to image file paths for the server
        for(var i=0; i < req.body.images.length; i++){
          req.body.images[i] = "./client/build"+req.body.images[i];
        }

        //Waits for Drive img URLS to come back so we can include them in the addRows() request
        var promise = client.Upload(req.body.images, req.body.concatAddress, req.body.violationData.name, req.body.violationData.isResolved);
        promise.then(function (resolved) {
          //Individual drive URLs are separated by '|'
          for(var i=0; i < resolved.length; i++){
            imgPaths = imgPaths+" | "+resolved[i].webViewLink;
          }
          //Waits for image timestamp to be included in addRows()
          let timeStampPromise = GetOldestPhotoTimestamp(req.body.images);
          timeStampPromise.then(function (resolved) {
             console.log(resolved);
             let ts = resolved;
             //Waits for possible GPS coordinates of image(s) to be included in request
             let gpsPromise =  GetFirstPhotoGPS(req.body.images);
             gpsPromise.then(function (resolved) {
                 let gps = {lat: '', long: ''};
                 gps.lat = (resolved.lat !== undefined) ? resolved.lat : '';
                 gps.long = (resolved.long !== undefined) ? resolved.long : '';
                 //Create request if Address Dropdown was used on form
                 Object.keys(req.body.houseData).length ?
                     mySheet.addRow({
                         Street_Number: req.body.houseData.streetNumber,
                         Street_Name: req.body.houseData.streetName,
                         City: req.body.houseData.city,
                         State: req.body.houseData.state,
                         Zip: req.body.houseData.zip,
                         Full_Address: req.body.houseData.fullAddress,
                         Lat: gps.lat,
                         Long: gps.lat,
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
                         }
                     )
                     :
                     mySheet.addRow({
                         //Create request if Custom Location/Address field was used on form
                         Custom: req.body.concatAddress,
                         Lat: gps.lat,
                         Long: gps.lat,
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
                         addMetadata(req.body.concatAddress);
                         res.send("done");
                     });
             });
              gpsPromise.catch(function (err) {
                  console.log(err);
              })
          });
            timeStampPromise.catch(function (err) {
                console.log(err);
            })
        });
        promise.catch(function (err) {
          console.log(err);
        })
      }
      else{
        //Request if images were NOT uploaded in the form
        var ts = dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
        Object.keys(req.body.houseData).length ?
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
            })
            :
            mySheet.addRow({
              Custom: req.body.concatAddress,
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
              addMetadata(req.body.concatAddress);
              res.send("done");
            });
      }
    } );
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Gets current timestamp (system time)
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

// Gets the EXIF GPS coordinates of the first photo in an array, or the passed photo, or passes an empty object back
function GetFirstPhotoGPS(photoRefs) {
  return new Promise((resolve, reject) => {
    let photoGPS = null;
    if (Array.isArray(photoRefs)) {
      var promises = [];
      for(var index = 0; index < photoRefs.length; index++) {
        promises.push(GetExifGPS(photoRefs[index]));
      }
      Promise.all(promises).then((results) => {
        for (let index = 0; index < results.length; index++) {
          if (!(isEmpty(results[index]))) {
            resolve(results[index]);
          }
        }
        resolve({});
      }).catch((err) => { 
        console.log("Error: GetFirstPhotoGPS - "+err);
        resolve({});  // Always resolves, even upon an error
      });    
    } else {
      photoGPS = GetExifGPS(photoRefs).then((resolve) => {
        isEmpty(photoGPS) ? resolve({}) : resolve(photoGPS);
      })
      .catch((error) => {
        console.log("Error: "+error);
        resolve({});
      });
    }
  });
}

function GetExifGPS(photoRef) {
  return new Promise((resolve, reject) => {
    try {
      new ExifImage({ image : photoRef }, function (error, exifData) {
        if (error) {
          console.log('Error: '+error.message);
          resolve({});
        }
        else {
          if (typeof exifData !== "undefined" && typeof exifData.gps !== "undefined" && !(isEmpty(exifData.gps))) {
            if (Array.isArray(exifData.gps.GPSLatitude) && Array.isArray(exifData.gps.GPSLongitude) && typeof exifData.gps.GPSLongitudeRef !== "undefined" && typeof exifData.gps.GPSLatitudeRef !== "undefined") {
              resolve({
                lat: ConvertDMSToDD(exifData.gps.GPSLatitude[0], exifData.gps.GPSLatitude[1], exifData.gps.GPSLatitude[2], exifData.gps.GPSLatitudeRef),
                long: ConvertDMSToDD(exifData.gps.GPSLongitude[0], exifData.gps.GPSLongitude[1], exifData.gps.GPSLongitude[2], exifData.gps.GPSLongitudeRef)
              });
            }
            else {
              resolve({});
            }
          }
          resolve({});
        }
      });
    } catch (error) {
      reject('Error: ' + error.message);
    }
  });
}

// Gets the oldest EXIF timestamp from an array of photos or the photo, or returns the current system time
function GetOldestPhotoTimestamp(photoRefs) {
  return new Promise((resolve, reject) => {
    let oldestTimestamp = null;

    if (Array.isArray(photoRefs)) {
      var promises = [];
      for(var index = 0; index < photoRefs.length; index++) {
        let buffer = readChunk.sync(photoRefs[index], 0, 12);
        if (imageType(buffer).ext === "jpg") {
          promises.push(GetExifTimestamp(photoRefs[index]));
        }
      }
      Promise.all(promises).then((results) => {
        for (let index = 0; index < results.length; index++) {
          // Contend with Results
          if (results[index] !== -1) {
            try {
              let indexTimestamp = new Date(convertExifTimeToDate(results[index]));
              if (oldestTimestamp === null) {
                oldestTimestamp = indexTimestamp;
              } else {
                oldestTimestamp = indexTimestamp < oldestTimestamp ? indexTimestamp : oldestTimestamp;
              }
            } catch (error) {
              console.log("Invalid EXIF Date String")
            }
          }
        }
        if (oldestTimestamp === null) oldestTimestamp = getTimestamp();
        resolve(dateFormat(oldestTimestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT"));
      }).catch((err) => { 
        console.log("Error: GetOldestTimestamp - "+err);
        resolve(dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT")); 
      });
    } else {
      let buffer = readChunk.sync(photoRefs, 0, 12);
      if (imageType(buffer).ext !== "jpg") {
        resolve(dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT")); 
      }
      
      GetExifTimestamp(photoRefs).then((results) => {
        if (results === -1) {
          resolve(dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT")); 
        } else {
          let resultsDate = new Date(photoTimestep);
          oldestTimestamp = resultsDate < oldestTimestamp ? resultsDate : oldestTimestamp;
          resolve(dateFormat(oldestTimestamp, "dddd, mmmm dS, yyyy, h:MM:ss TT"));;
        }
      }).catch((err) => { 
        console.log("Error: GetOldestTimestamp - "+err);
        resolve(dateFormat(getTimestamp(), "dddd, mmmm dS, yyyy, h:MM:ss TT")); 
      });
    }
  });
}

function GetExifTimestamp(photoRef) {
  return new Promise((resolve, reject) => {
    try {
      new ExifImage({ image : photoRef }, function (error, exifData) {
        if (error) {
          console.log('Error: '+error.message);
          resolve(-1);
        }
        else {
          if (typeof exifData !== "undefined" && typeof exifData.image !== "undefined" && typeof exifData.image.ModifyDate !== "undefined") {
            resolve(exifData.image.ModifyDate);
          } else {
            resolve(-1);
            //reject('Error: ' + error.message);
          }
        }
      });
    } catch (error) {
      console.log('Error: ' + error.message);
      resolve(-1);
    }
  });
}

function addMetadata(customAddress) {
  return new Promise((resolve, reject) => {
    setAuth(function() {
      doc.getInfo(function(err, data) {
        if (data === undefined) {
          console.log(err);
          resolve("Error");
        } else {
          let mySheet = data.worksheets.find(x => x.title === "MetaData");
          mySheet.addRow({
            Custom: customAddress,
          },function () {
              console.log("Custom Address added to MetaData");
          });
          resolve("Ok");
        }
      });
    });
  });
}


function formatFullAddress(streetNumber,streetName,city,state,zip) {
  return streetNumber+" "+streetName+" "+city+", "+state+" "+zip;
}

// Checks if an object is empty example = {}
function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
        return false;
  }
  return true;
}

// Checks if a folder at dirPath exists, and if it doesn't create it
function mkdirSync(dirPath) {
  try {
    fs.mkdirSync(__dirname+dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST')  {
      return 'Error: '+err;
    } else {
      return 'stagingPath exists already';
    }
  }
  return 'stagingPath has been created';
}
// Converts GPS in degress, minutes and seconds to decimal
function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = degrees + minutes/60 + seconds/(60*60);

  if (direction === "S" || direction === "W") {
      dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
}

// Convets EXIF formatted timestamp to data object
function convertExifTimeToDate(exifTS) {
  let str = exifTS.split(" ");
  //get date part and replace ':' with '-'
  let dateStr = str[0].replace(/:/g, "-");
  //concat the strings (date and time part)
  let properDateStr = dateStr + " " + str[1];
  //pass to Date
  return(new Date(properDateStr));
}