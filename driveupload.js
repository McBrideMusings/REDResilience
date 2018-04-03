/*
  This is used by several samples to easily provide
  an oauth2 workflow.
*/

'use strict';

const {google}        = require('googleapis');
const http            = require('http');
const url             = require('url');
const querystring     = require('querystring');
const opn             = require('opn');
const destroyer       = require('server-destroy');
const fs              = require('fs');
const path            = require('path');
const uuidv4          = require('uuid/v4');
const readChunk       = require('read-chunk'); // npm install read-chunk 
const imageType       = require('image-type');


const drive           = google.drive('v3');
const sheets          = google.sheets('v4');

const rootFolderId    = '1lB53NoYKh26pQUi1YqFY2MtwKYe7gsEA'; // The folder ID for the root T4 folder
const scopes          = ['https://www.googleapis.com/auth/spreadsheets','https://www.googleapis.com/auth/drive'];

class DriveUpload {
  constructor (creds, callback) {
    if (creds == null) {
      if(callback) callback("No credentials provided!");
    }
    this.creds = creds;

    // configure a JWT auth client
    this.jwtClient = new google.auth.JWT (
      creds.client_email,
      null,
      creds.private_key,
      scopes);
      //authenticate request
    this.jwtClient.authorize(function (err, tokens) {
      if (err) {
        console.log(err);
        if(callback) callback(err);
        return;
      } else {
        console.log("Successfully connected!");
        if(callback) callback(null, this.jwtClient);
      }
    });
  }
    //mimeType = 'application/vnd.google-apps.folder' and this.handleChange = this.handleChange.bind(this);
    /// Takes a file reference (file already named), a concat'd number and address, and a bool for isResolved
    /// Returns a public link to the photo
  Upload(file, address, isResolved) {
    return new Promise((resolve, reject) => {
      drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and '${rootFolderId}' in parents`,
        auth: this.jwtClient
      }).then((resolve) => {
        let data = resolve.data.files;
        let foundFolder = null;
        for (let index = 0; index < data.length; index++) {
          const folder = data[index];
          console.log(folder);
          if (folder.name === address) {
            foundFolder = folder.id;
            break;
          }
        }
        if (foundFolder === null) {
          console.log("not found!");
          let newID = this.CreateNewFolder(address, rootFolderId);
          
        }
        else {
          this.AddToFolder(file,foundFolder);
        }
        resolve(resolve.data);
      }).catch((error) => {
        reject(Error("It broke"));
      });
    });
  };
  CreateNewFolder(folderName, folderID) {
    console.log(folderName + " " + folderID);
    let fileMetadata = {
      name: `${folderName}`,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [`${folderID}`]
    };
    drive.files.create({
      resource: fileMetadata,
      fields: 'id',
      auth: this.jwtClient
    }).then((resolve) => {
      return resolve.data.id;
    }).catch((error) => {
      //res.send("Opps");
    });
  }
  AddToFolder(file, folderID) {
    console.log(file + " " + folderID);
    const buffer = readChunk.sync(file, 0, 12);
    var fileMetadata = {
      name: `${path.basename(file)}`,
      parents: [`${folderID}`]
    };
    var media = {
      mimeType: imageType(buffer).mime,
      body: fs.createReadStream(file)
    };
    drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
      auth: this.jwtClient
    }).then((resolve) => {
      return resolve.data.id;
    }).catch((error) => {
      //res.send("Opps");
    });
  }
  GetFolderList(folderID) {
    //var x;

    /*
    , (err, res) => {
      if (err) {
        throw err;
      }
      return "x";
      //this.x = res.data;
    });
    */
    //console.log(x);
    //return x;
  }
    /*
    this.upload = (file, fileName, folderID, callback) => {
      if (fileRef !== undefined) {
        //callback or promise
      }
      if (fileName !== undefined) {
        //callback or promise
      }

      var fileMetadata = {
        'name': fileName == undefined ? fileName : `${uuidv4()}${path.extname(file.originalname)}`,
        parents: [folderId]
      };
      var media = {
        mimeType: 'image/png',
        body: fs.createReadStream('./test1.png')
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
        auth: this.jwtClient
      }, function (err, file) {
        if (err) {
          // Handle error
          throw (err);
        } else {
          return ('File Id: ', file.id);
        }
      });
    }
    */
}

module.exports = DriveUpload;