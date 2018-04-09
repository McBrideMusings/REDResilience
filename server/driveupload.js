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

  Upload(file, address, violation, isResolved) {
    return new Promise((resolve, reject) => {
      var date = new Date();
      let name = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + "_" + violation;
      drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and '${rootFolderId}' in parents`,
        auth: this.jwtClient
      })
      .then((folderList) => {
        let data = folderList.data.files;
        let foundFolder = null;
        for (let index = 0; index < data.length; index++) {
          const folder = data[index];
          if (folder.name === address) {
            foundFolder = folder.id;
            break;
          }
        }
        this.AddFileToDrive(file,name,foundFolder)
        .then((results) => {
          resolve(results.webViewLink);
        })
        .catch((err) => {
          reject(Error("From Upload: "+err));
        })
      })
      .catch((err) => {  
        reject(Error("From Upload: "+err));
      });
    });
  }
  AddFileToDrive(file, fileName, folderID) {
    return new Promise((resolve, reject) => {
      if (folderID === null || folderID === undefined) { // No existing photos of this house
        this.CreateNewFolder(address, rootFolderId)
        .then((newFolderID) => {
          return Promise.all([
            newFolderID, 
            this.AddFileToFolder(file,fileName,newFolderID)
          ]); 
        })
        .then((results) => { //Array of results
          resolve(results[0]);
        })
        .catch((err) => {  
          reject(Error("From AddFileToDrive: "+err));
        });
      } else {
        this.AddFileToFolder(file,fileName,folderID)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {  
          reject(Error("From AddFileToDrive: "+err));
        });
      }
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
      }).then((resolve) => {
        resolve(resolve.data.id);
      }).catch((err) => {
        reject(Error("From CreateNewFolder: "+err));
      });
    });
  }
}





    //mimeType = 'application/vnd.google-apps.folder' and this.handleChange = this.handleChange.bind(this);
    /// Takes a file reference (file already named), a concat'd number and address, and a bool for isResolved
    /// Returns a public link to the photo
    /*
  Upload(file, address, violation, isResolved) {
    Promise.all([firstThingAsync, secondThingAsync])  
      .then(function(results) {
        // do something with result1 and result2
        // available as results[0] and results[1] respectively
      })
      .catch(function(err) {  });

    firstThingAsync()  
      .then(function(result1) {
        return Promise.all([result1, secondThingAsync(result1)]); 
      })
      .then(function(results) {
        // do something with results array: results[0], results[1]
      })
      .catch(function(err){  });


    return new Promise((resolve, reject) => {
      var date = new Date();
      let name = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + "_" + violation;
      drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and '${rootFolderId}' in parents`,
        auth: this.jwtClient
      })
      .catch((error) => {
        console.log("that");
        reject(Error("Failed to gather list of folders in root "+rootFolderId));
      }).then((resolve) => {
        console.log("this");
        let data = resolve.data.files;
        let foundFolder = null;
        for (let index = 0; index < data.length; index++) {
          const folder = data[index];
          if (folder.name === address) {
            foundFolder = folder.id;
            break;
          }
        }
        console.log("this");
        resolve(name);
      });

        if (foundFolder === null) { // No existing photos of this house
          this.CreateNewFolder(address, rootFolderId)
          .then((newFolderID) => {
            this.AddFileToFolder(file,name,newFolderID)
            .then((newFileData) => {
              resolve(newFileData.webViewLink);
            }).catch((error) => {
              reject(Error("Failed to upload new file to "+address));
            });
          }).catch((error) => {
            reject(Error("Failed to create new folder "+address));
          });
          let newFile = this.AddFileToFolder(file,name,newID);
          resolve(newfile.webViewLink);
          /* TODO - Resolve photos by 
          if (isResolved) {
            this.ResolveFolderContents(violation,newID)
            .then((fulfilled) => {
              this.AddFileToFolder(file,name,newID);
              resolve(resolve.data);
            }).catch((error) => {
              reject(Error("It broke"));
            });
          } else {
            this.AddFileToFolder(file,name,newID);
            resolve(resolve.data);
          }
          
        }
        else {
          this.AddFileToFolder(file,name,foundFolder);
          resolve(newfile.webViewLink);
        }
      }).catch((error) => {
        reject(Error("Failed to gather list of folders in root "+rootFolderId));
      });
      */
  /*
  GetPhotoFolderList() {
    return new Promise((resolve, reject) => {
      drive.files.list({
        q: `mimeType = 'application/vnd.google-apps.folder' and '${rootFolderId}' in parents`,
        auth: this.jwtClient
      }).then((resolve) => {
        let data = resolve.data.files;
        let foundFolder = null;
        for (let index = 0; index < data.length; index++) {
          const folder = data[index];
          if (folder.name === address) {
            foundFolder = folder.id;
            break;
          }
        }
      }.catch((error) => {
        reject(Error(error));
      });
    })

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
      }).then((resolve) => {
        resolve(resolve.data.id);
      }).catch((error) => {
        reject(Error(error));
      });
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
        fields: 'id',
        auth: this.jwtClient
      }).then((resolve) => {
        resolve(resolve.data);
      }).catch((error) => {
        reject(Error(error));
      });
    });
  }
  ResolveFolderContents(violation, folderID) { // unfinished
    return new Promise((resolve, reject) => {
      drive.files.list({
        q: `'${folderID}' in parents`,
        auth: this.jwtClient
      }).then((resolve) => {
        let data = resolve.data.files;
        for (let index = 0; index < data.length; index++) {
          const file = data[index];
          const indexAfterDate = file.name.indexOf("_"); // _ should be in all filenames
          if (indexAfterDate != -1) continue; // missing underscore (_), possibly misadded file
          if (file.name.length <= 7) continue // name shorter than resolved (length 7)
          if (indexAfterDate+violation.length > file.name.length) continue; // violation name too long
          if (file.substring(indexAfterDate+1, file.name.length) === violation) { // Found a match
            drive.files.update({
              fileId: file.id,
              name: "resolved-"+file.name,
              removeParents: previousParents,
              fields: 'id, parents'
            }, function (err, file) {
              if (err) {
                // Handle error
              } else {
                // File moved.
              }
            });
          }
          if (folder.name === address) {
            foundFolder = folder.id;
            break;
          }
        }
        resolve(resolve.data);
      }).catch((error) => {
        reject(Error("It broke"));
      });
    });
  }   
  */

module.exports = DriveUpload;