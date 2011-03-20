/*
 * server.js
 */

var sys = require('sys'),
    http = require('http'),
    winston = require('winston'),
    database = require('./database'),
    tasteNote = require('./tasteNote'),
    helpers = require('./helpers'),
    service = require('./service');

/**
 * Creates the server
 * @param {int} port: Port for the server to run on
 * @param {connection} database: Connection to CouchDB
 */
exports.createServer = function (port, database) {
    var resource = new tasteNote.TasteNote(database),
        router = service.createRouter(resource);

        var server = http.createServer(function (request, response) {
            var body = '';

            winston.info('Incoming Request', { url: request.url });

            request.on('data', function (chunk) {
                body += chunk;
            });

            request.on('end', function () {
                //
                // Dispatch the request to the router
                //
                var emitter = router.handle(request, body, function (route) {
                    response.writeHead(route.status, route.headers);
                    response.end(route.body);
                });

                emitter.on('log', function (info) {
                    winston.info('Request completed', info);
                });
            });
        });

    if (port) {
        server.listen(port);
    }

    return server;
};

/**
 * Creates the server
 * @param {int} port: Port for the server to run on
 * @param {connection} database: Connection to CouchDB
 */
exports.start = function (options, callback) {
    var db = new database.Database();
    return callback(null, exports.createServer(options.port, db));
};