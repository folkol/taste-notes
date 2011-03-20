/*
 * tasteNote.js: Top-level include for the Pinpoint module.
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENSE
 *
 */

var helpers = require('./helpers');

/**
 * Constructor function for the TasteNote object..
 * @constructor
 * @param {connection} database: Connection to CouchDB
 */
var TasteNote = exports.TasteNote = function (database) {
    this.database = database;
};

/**
 * Lists all TasteNotes in the database
 * @param {function} callback: Callback function
 */
TasteNote.prototype.list = function (id, callback) {
    this.database.getById(id, function (err, result) {
        if (err) {
            return callback(err);
        }
        return callback(null, {id: id});
    });
    //    callback(null, result.rows.map(function (row) { return row.value }));
};

/**
 * Shows details of a particular tasteNote
 * @param {string} id: ID of the tasteNote
 * @param {function} callback: Callback function
 */
TasteNote.prototype.show = function (id, callback) {
    //    callback(id + 10);
    this.database.getById(id, function (err, doc) {
        if (err) {
            return callback(err);
        }

        return callback(null, doc);
    });
};

/**
 * Creates a new tasteNote with the specified properties
 * @param {object} tasteNote: Properties to use for the tasteNote
 * @param {function} callback: Callback function
 */
TasteNote.prototype.create = function (tasteNote, callback) {
    tasteNote._id = helpers.randomString(32);
    tasteNote.resource = "TasteNote";

    this.database.save(tasteNote._id, tasteNote, function (err, res) {
        if (err) {
            return callback(err);
        }

        return callback(null, tasteNote);
    });
};

/**
 * Updates a new tasteNote with the specified id and properties
 * @param {object} tasteNote: Properties to update the tasteNote with
 * @param {function} callback: Callback function
 */
TasteNote.prototype.update = function (id, tasteNote, callback) {
    this.database.merge(id, tasteNote, function (err, res) {
        if (err) {
            return callback(err);
        }

        return callback(null, true);
    });
};

/**
 * Destroys a tasteNote with the specified ID
 * @param {string} id: ID of the tasteNote to destroy
 * @param {function} callback: Callback function
 */
TasteNote.prototype.destroy = function (id, callback) {
    var self = this;
    this.show(id, function (err, doc) {
        if (err) {
            return callback(err);
        }

        return self.database.remove(id, doc._rev, function (err, res) {
            if (err) {
                return callback(err);
            }

            return callback(null, true);
        });
    });
};