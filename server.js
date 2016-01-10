/* ***********************
 * Initialize Middleware *
 * **********************/

var express = require('express');
var httpServer = require('http');
var files = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var package = require('./package.json')

const VERSION = package.version;
const VENDOR_NAME = 'Apex Data Solutions, LLC';
const description = package.description;

app.use(bodyParser.json({ strict: false, limit: 50000000, inflate: true }));

/* **************
 * CONFIGURE *
 * **************/
app.use(express.static(path.resolve("./")));

app.post('/test', function (req, res) {
    //add extra header
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //the JSON is in the body
    console.dir(req.body);
    
    //the querystring is here:
   
    console.log(req.query)

    //here you send a response / confirmation to the client
    res.type('application/json');
    res.send(JSON.stringify({ err: 'false' }));

});

/* ******************
 * Start the server *
 * ******************/

var port = 1337;
//add extra header
app.use(function (req, res, next) {
    //add extra header
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

var server = app.listen(port, function () {
    console.log('Listening on port:', port);
});