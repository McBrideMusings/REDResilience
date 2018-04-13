'use strict';
// libraries
const {google}        = require('googleapis');
const http            = require('http');
const url             = require('url');
const fs              = require('fs');
const path            = require('path');
const uuidv4          = require('uuid/v4');
const readChunk       = require('read-chunk');
const imageType       = require('image-type');
const drive           = google.drive('v3');
const sheets          = google.sheets('v4');
const rootFolderId    = process.env.DRIVE_PHOTOFOLDERID; // The folder ID for the root T4 folder
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
  Upload(files, address, violation, isResolved) {
    return new Promise((resolve, reject) => {
      var date = new Date();
      let name = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + "_" + violation;
      drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and '${rootFolderId}' in parents`,
        auth: this.jwtClient
      })
      .then((folderList) => {
        let data = folderList.data.files;
        let folderID = null;
        for (let index = 0; index < data.length; index++) {
          const folder = data[index];
          if (folder.name === address) {
            folderID = folder.id;
            break;
          }
        }
        if (folderID === null) { // No existing photos of this house
          this.CreateNewFolder(address, rootFolderId)
          .then((newFolderID) => {
            return Promise.all([
              newFolderID, 
              this.ProcessFiles(files,address,name,newFolderID) 
            ]); 
          })
          .then((results) => { resolve(results[1]); })
          .catch((err) => { reject(Error("CreateFolder- "+err)); });
        } else {
          this.ProcessFiles(files,address,name,folderID)
          .then((results) => { resolve(results); })
          .catch((err) => { reject(Error("FoundFolder- "+err)); });
        }
      })
      .catch((err) => { reject(Error("DriveFolderList- "+err)); });
    });
  }
  ProcessFiles(files, address, fileName, folderID) {
    var promises = [];
    if (Array.isArray(files)) {
      for (let index = 0; index < files.length; index++) {
        promises.push(this.AddFileToFolder(files[index],fileName,folderID));
      }
    } else {
      promises.push(this.AddFileToFolder(files,fileName,folderID));
    }
    return new Promise((resolve, reject) => {
      Promise.all(promises)
      .then((results) => { resolve(results); })
      .catch((err) => { reject(Error("From ProcessFiles: "+err)); });
    });
  }
  AddFileToFolder(file, fileName, folderID) {
    return new Promise((resolve, reject) => {
      const buffer = readChunk.sync(file, 0, 12);
      var fileMetadata = {
        name: `${fileName}${path.extname(file)}`,
        parents: [`${folderID}`]
      };
      var media = {
        mimeType: imageType(buffer).mime,
        body: fs.createReadStream(file)
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
        auth: this.jwtClient
      }).then((results) => {
        resolve(results.data);
      }).catch((err) => {
        reject(Error("From AddFileToFolder: "+err));
      });
    });
  }
  CreateNewFolder(folderName, folderID) {
    return new Promise((resolve, reject) => {
      let fileMetadata = {
        name: `${folderName}`,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [`${folderID}`]
      };
      drive.files.create({
        resource: fileMetadata,
        fields: 'id',
        auth: this.jwtClient
      }).then((folderData) => {
        resolve(folderData.data.id);
      }).catch((err) => {
        reject(Error("From CreateNewFolder: "+err));
      });
    });
  }
}
module.exports = DriveUpload;