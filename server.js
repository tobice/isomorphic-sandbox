/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
require('node-jsx').install({extension: '.jsx'});
var http = require('http');
var express = require('express');
var expressState = require('express-state');
var compression = require('compression');
var bodyParser = require('body-parser');
var debug = require('debug')('Example');
var React = require('react');
var ReactAsync = require('react-async');
var Application = require('./app/app');
var navigateAction = require('flux-router-component').navigateAction;
var Fetcher = require('fetchr');

var app = express();
expressState.extend(app);
app.set('state namespace', 'App');
app.set('views', __dirname + '/app'); // only for layout
app.set('view engine', 'jade');

// Enable GZip compression and serving static files
app.use(compression());
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

Fetcher.registerFetcher(require('./app/fetchers/post'));
app.use(Application.config.xhrPath, Fetcher.middleware());

app.use(function (req, res, next) {
    var fetcher = new Fetcher({
        req: req
    });
    var application = new Application({
        fetcher: fetcher
    });

    application.context.getActionContext().executeAction(navigateAction, {
        path: req.url
    }, function (err) {
        if (err) {
            if (err.status && err.status === 404) {
                next();
            } else {
                next(err);
            }
            return;
        }

        /**
         * Send generated markup.
         * @param error
         * @param {String} html
         * @param {Object} data component's state. Standard React-async
         *  approach is to inject the data as JSON into html markup. But
         *  we use Flux stores for holding the state, so instead we inject
         *  stores into markup.
         */
        var sendMarkup = function (error, html, data) {

            if (error) {
                console.log(error);
            }

            debug('Exposing context state');
            res.expose(application.context.dehydrate(), 'Context');

            debug('Rendering application into layout');
            res.render('layout', {
                html: html
            }, function (err, markup) {
                if (err) {
                    next(err);
                }
                debug('Sending markup');
                res.send(markup);
            });
        };

        debug('Rendering Page component');
        ReactAsync.renderComponentToStringWithAsyncState(application.getComponent(), sendMarkup);
        // var markup = React.renderComponentToString(application.getComponent());
        // sendMarkup(null, markup, {});
    });
});

var port = process.env.PORT || 3000;
http.createServer(app).listen(port);
console.log('Listening on port ' + port);
