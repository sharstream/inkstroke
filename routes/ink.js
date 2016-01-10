/* *****************
 * Management Mongo/ink *
 * *****************/

var mongo = require('mongodb');
var script = require('../MyScriptMethods.js');

var Server = mongo.Server,
    Db = mongo.Db;
var ObjectId = require('mongodb').BSONPure.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('inkdata', server);

var MongoClient = require('mongodb').MongoClient
var URL = 'mongodb://localhost:27017/inkdata'

var state = {
  db: null,
}

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'inkdata' database");
        db.collection('inks', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'inks' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving ink: ' + id);
    db.collection('inks', function(err, collection) {
        collection.findOne({'_id':new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('inks', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addInk = function(req, res) {
    var ink = req.body;
    console.log('Adding ink item: ' + JSON.stringify(ink));
    db.collection('inks', function(err, collection) {
        collection.insert(ink, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateInk = function(req, res) {
    var id = req.params.id;
    var ink = req.body;
    console.log('Updating ink: ' + id);
    console.log(JSON.stringify(ink));
    db.collection('inks', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, ink, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wine: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(ink);
            }
        });
    });
}

exports.deleteInk = function(req, res) {
    var id = req.params.id;
    console.log('Deleting ink: ' + id);
    db.collection('inks', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

var populateDB = function() {
    var strokes = script.getRangeStrokesAndLimits();
    var strokeArray = strokes.strokes
    var recognition = script.recognize(strokeArray);
    for (var idx = 0; idx < strokeArray.length(); idx++) {
        db.collection('inks', function (err, collection) {
            collection.insert(strokeArray[idx], { safe: true }, function (err, result) {
                console.log("Successfully inserted:" + strokeArray.toString())    
            });
        });
    }
};
