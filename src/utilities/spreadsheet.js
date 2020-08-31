const credentials = require('../../../credentials.json');
const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const TOKEN_PATH = '../../../token.json';

function getNewToken(oAuth2Client, cb) {
   const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
   });
   console.log('Authorize this app by visiting this url:', authUrl);
   const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
   });
   rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
         if (err)
            return console.error(
               'Error while trying to retrieve access token',
               err
            );
         oAuth2Client.setCredentials(token);
         // Store the token to disk for later program executions
         fs.writeFileSync(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
         });
         cb(oAuth2Client);
      });
   });
}

function authorize(callback) {
   const { client_secret, client_id, redirect_uris } = credentials.installed;
   const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
   );
   const token = require(TOKEN_PATH);
   oAuth2Client.setCredentials(token);
   callback(oAuth2Client);
   /*
   if (fs.existsSync(TOKEN_PATH)) {
      const token = require(TOKEN_PATH);
      oAuth2Client.setCredentials(token);
      callback(oAuth2Client);
   } else {
      getNewToken(oAuth2Client, callback);
   }*/
}

module.exports = {
   authorize,
};
