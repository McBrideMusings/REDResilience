/**
 * Created by Brendan on 2/21/2018.
 */
var express = require("express");
var bodyParser = require("body-parser");
var http = require('http');
var io = require('socket.io');
var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('13CzpEoPA2bxh6w-heRgog5pejYQ_uttE1qVtI3TWwIc');
var sheet;

var app = express();
app.use(express.static('./public'));
var server = http.createServer(app).listen(8124);
io = io.listen(server);

// Body Parser Middleware
app.use(bodyParser.json());

//CORS Middleware (not currently being used b/c Socket.io)
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

function setAuth() {
    var creds = require('./master-creds.json');
    doc.useServiceAccountAuth(creds, getInfoAndWorksheets);
}

//From NPM example
function getInfoAndWorksheets() {
    doc.getInfo(function(err, info) {
        console.log('Loaded doc: '+info.title+' by '+info.author.email);
        sheet = info.worksheets[0];
        console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
    });
}
//From NPM example
function workingWithRows() {
    sheet.getRows({
        offset: 1,
        limit: 20,
        orderby: 'col2'
    }, function( err, rows ){
        console.log('Read '+rows.length+' rows');
        rows[0].colname = 'new vally';
        rows[0].save(); // this is async
    });
}
//From NPM example
function workingWithCells(data) {
        sheet.getCells({
        'min-row': 1,
        'max-row': 3,
        'return-empty': true
    }, function(err, cells) {
        var cell = cells[0];
        // console.log(cells);
        console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
        cell.value = data;
        cell.save(); //async
    });
}

//When socket connection occurs
io.sockets.on("connection",function(socket){

    //First, do auth
    setAuth();

    var message_to_client = {
        data:"Connection with the server established"
    };
    socket.send(JSON.stringify(message_to_client));
    console.log('Socket.io Connection with the client established');

    //Listening for when a new violation is added on the client
    //Right now, only captures an isolated codeviolation object
    socket.on("newViolation", function (data) {
        data = JSON.parse(data);
        console.log(data.codeviolation);
    });

    //Legacy example code from old form
    socket.on("message",function(data){
        data = JSON.parse(data);

        console.log(data.message);

        //workingWithRows();
        workingWithCells(data.message);
        var ack_to_client = {
            data:"Server Received the message"
        };
        socket.send(JSON.stringify(ack_to_client));
    });

});