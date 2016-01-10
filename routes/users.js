var express = require('express');
var router = express.Router();
var cookie = require('cookie-parser')
var async = require('async')
var ink = require('./ink.js')
/*GET users listing*/
var fs = require('fs')
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('userlist', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'user' database");
        db.collection('user', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'userlist' collection doesn't exist. Creating it with sample data...");
                //at this point you should call your method for inserting documents.
            }
        });
    }
});

router.get('/', function(req, res){
	res.send('respond with a resource');
});

router.get('/userlist', function(req, res){
	var db = req.db;
	var colleciton = db.get('userlist');
	collection.find({},{}, function(e, docs){
		res.json(docs);
	});
});

router.users = function check(collection) {
    var records = [{ body: "Test 1" }, { body: "Test 2" }];
    async.eachSeries(records, function (item, callback) {
        collection.find(item, function (err, rows) {
            console.log(rows);
            callback(err)
        });
    }, function (err) {
        if (err) throw err;
        console.log("done");
    });
}

exports.home_post_handler = function (req, res) {
    username = req.body.username || 'joestudent@gmail.com';
    req.session.username = username;
    res.redirect('/');
};

exports.home = function (req, res) {
    if (typeof req.session.username == 'undefined') res.render('home', { title: 'Inkstroke Tool Demo' });
    else res.redirect('/userlist');
};

// handler for displaying the inkstrokes

exports.inks = function (req, res) {
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else res.render('inks', { title: 'Inkstroke Tool Demo - Inks', username: req.session.username, inks: inks });
};

// handler for displaying individual inktrokes

exports.Textresult = function (req, res) {
    if (typeof req.session.username == 'undefined') res.redirect('/');
    else {
        var name = user[req.params.id];
        var inkstroke = ink.findAll();
        res.render('Result: ', { title: 'Inkstroke Tool Demo - ' + name, username: req.session.username, name: name, strokes: JSON.stringify(inkstroke) });
    }
};

module.export = router;