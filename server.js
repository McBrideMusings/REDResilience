"use strict";
// libraries
const port              = process.env.PORT || 3001;
const express           = require("express");
const bodyParser        = require('body-parser');
const multer            = require('multer');
const uuidv4            = require('uuid/v4');
const cors              = require('cors');
const fs 	              = require("fs");
const path              = require('path');
const GoogleSpreadsheet = require('google-spreadsheet');


// config
const maxFileSize = 10000000000; // Might be total across all uploaded files
const maxNumFiles = 10;


// setup
var sheet;
const creds = require('./master-creds.json');
const data = require(__dirname + "/data.json");
const doc = new GoogleSpreadsheet('1AEvI_VAcKss93_angVXQowdvnjL8u0diIjLsO3vnlJs');

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
  },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxFileSize }
});

const app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app 
app.post('/upload', (req, res) => {
  upload.array("userPhoto", maxNumFiles)(req,res,function(err) {
    /*
      We now have a new req.file object here. At this point the file has been saved
      and the req.file.filename value will be the name returned by the
      filename() function defined in the diskStorage configuration. Other form fields
      are available here in req.body.
    */
    console.log(req.files);
    if(err) {
      res.status(500).send({ error: err.code });
      return res.end();
    }
    // res.end("File is uploaded");
    let fileNames = [];
    for (let i = 0; i < req.files.length; i++) {
      // This is possibly what we want in production
      // fileNames[i] = req.files[i].destination+req.files[i].filename;
      fileNames[i] = req.files[i].filename;
    }
    res.json({files: fileNames});
    //res.end("File is uploaded");
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
/*

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
          offset: 1,
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

function setAuth(callback) {
  doc.useServiceAccountAuth(creds, callback);
}
function formatFullAddress(streetNumber,streetName,city,state,zip) {
  return streetNumber+" "+streetName+" "+city+", "+state+" "+zip;
}
*/