/*
 * database.js
 *
 */

var sys = require("sys"),
    Db = require('mongodb').Db,
    MongoServer = require('mongodb').Server,
    Connection = require('mongodb').Connection,
    test = require("assert");


/**
 * Constructor function for the TasteNote object..
 * @constructor
 * @param {connection} database: Connection to CouchDB
 */
var Database = exports.Database = function () {
    this.db = new Db('taste-notes',
                     new MongoServer("localhost",
                                     Connection.DEFAULT_PORT, {}));
    var dbVar = this.db;
    this.db.open(function() {
        sys.puts("HELO");
        dbVar.dropDatabase(function(err, result) {
            sys.puts("Adding laffe CS");
            dbVar.collection('notes', function(err, collection) {
                collection.createIndex(["meta", ['_id', 1]], function(err, indexName) {
                    // Insert laffe
                    collection.insert([{'id':1,
                                        'Distillery':'Laphroaig',
                                        'Region':'Islay',
                                        'Name': "10YO Cask strength",
                                        'Batch': "002 JAN.10",
                                        'Age': "10",
                                        'Note': "Good shit!!",
                                        'Score': '89'},
                                       {'id':2,
                                        'Distillery':'Ardbeg',
                                        'Region':'Islay',
                                        'Name': "Uigedail",
                                        'Batch': "L9",
                                        'Note': "Among the nicest! SHIIIT",
                                        'Score': '90'}],
                                      function(err, docs) {
                                          docs.forEach(function(doc) {
                                              sys.puts("Fucking inserted!!!");
                                          });
                                       });
                });
            });
        });
    });
};


/**
 * Lists all TasteNotes in the database
 * @param {function} callback: Callback function
 */
Database.prototype.getById = function (id, callback) {
    this.db.collection('notes', function(err, collection) {
        collection.find({'id':id}, {'limit':1}, function(err, cursor) {
            cursor.nextObject(function(err, doc) {
                if (err) {
                    sys.puts("error: " + err);
                }
                else {
                    sys.puts("Returned 1 doc:" + doc);
                    callback(null, doc);
                }
            });
        });
    });
};
