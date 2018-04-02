/*
  This is used by several samples to easily provide
  an oauth2 workflow.
*/

'use strict';

const {google} = require('googleapis');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const opn = require('opn');
const destroyer = require('server-destroy');
const fs = require('fs');
const path = require('path');

const keys = require('./master-creds.json');
/*
const keyPath = path.join(__dirname, 'oauth2.keys.json');
let keys = { redirect_uris: [''] };
if (fs.existsSync(keyPath)) {
  keys = require(keyPath).web;
}
*/

class SampleClient {
  constructor (options) {
    this._options = options || { scopes: [] };

    // create an oAuth client to authorize the API call
    this.oAuth2Client = new google.auth.OAuth2(
      keys.client_id,
      keys.client_secret
      //keys.redirect_uris[0]
    );
  }

  // Open an http server to accept the oauth callback. In this
  // simple example, the only request to our webserver is to
  // /callback?code=<code>
  authenticate (scopes, callback) {
    // grab the url that will be used for authorization
    this.authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' ')
    });
    const server = http.createServer((req, res) => {
      if (req.url.indexOf('/oauth2callback') > -1) {
        const qs = querystring.parse(url.parse(req.url).query);
        res.end('Authentication successful! Please return to the console.');
        server.destroy();
        this.oAuth2Client.getToken(qs.code, (err, tokens) => {
          if (err) {
            console.error('Error getting oAuth tokens: ' + err);
            callback(err);
            return;
          }
          this.oAuth2Client.credentials = tokens;
          callback(null, this.oAuth2Client);
        });
      }
    }).listen(3000, () => {
      // open the browser to the authorize url to start the workflow
      opn(this.authorizeUrl, {wait: false}).then(cp => cp.unref());
    });
    destroyer(server);
  }
}

module.exports = new SampleClient();