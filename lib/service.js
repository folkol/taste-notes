/*
 * service.js:
 */

var journey = require('journey'),
    helpers = require('./helpers'),
    sys = require('sys');

/**
 * Creates the RESTful router for the pinpoint web service
 * @param {bookmark} resource: Instance of a bookmark resource
 */
exports.createRouter = function (resource) {
    var router = new (journey.Router);
    // ({
    //     strict: false,
    //     strictUrls: false,
    //     api: 'basic',
    //     filter: helpers.auth.basicAuth
    //   });

    //
    // Resource: Bookmarks
    //
    router.path(/\/notes/, function () {
        //
        // Authentication: Add a filter() method to perform HTTP Basic Auth
        //
        //    this.filter(function () {
        //
        // LIST: GET to /bookmarks lists all bookmarks
        //
        this.get(/([0-9]+)$/).bind(function (req, res, id) {
            resource.show(id, function(err, doc) {
                res.send(200, {'Content-Type':'application/json', 'Access-Control-Allow-Origin':"*"}, doc);
            });
        });

        //
        // SHOW: GET to /bookmarks/:id shows the details of a specific bookmark
        //
        this.get(/\/([\w|\d|\-|\_]+)/).bind(function (res, id) {
            resource.show(id, function (err, bookmark) {
                if (err) {
                    return res.send(500, {}, { error: err.error });
                }

                return res.send(200, {}, { bookmark: bookmark });
            });
        });

        //
        // CREATE: POST to /bookmarks creates a new bookmark
        //
        this.post().bind(function (res, bookmark) {
            resource.create(bookmark, function (err, result) {
                if (err) {
                    return res.send(500, {}, { error: err.error });
                }

                return res.send(200, {}, { bookmark: result });
            });
        });

        //
        // UPDATE: PUT to /bookmarks updates an existing bookmark
        //
        this.put(/\/([\w|\d|\-|\_]+)/).bind(function (res, id, bookmark) {
            resource.update(id, bookmark, function (err, updated) {
                if (err) {
                    return res.send(500, {}, { error: err.error });
                }

                return res.send(200, {}, { updated: updated });
            });
        });

        //
        // DELETE: DELETE to /bookmarks/:id deletes a specific bookmark
        //
        this.del(/\/([\w|\d|\-|\_]+)/).bind(function (res, id) {
            resource.destroy(id, function (err, destroyed) {
                if (err) {
                    return res.send(500, {}, { error: err.error });
                }

                return res.send(200, {}, { destroyed: destroyed });
            });
        });
    });
    //  });

    return router;
};