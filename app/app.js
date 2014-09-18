/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var Context = require('./lib/Context'),
    PostStore = require('./stores/PostStore'),
    PageStore = require('./stores/PageStore'),
    Application = require('./views/Page.jsx'),
    debug = require('debug'),
    bootstrapDebug = debug('Example'),
    routes = require('./config/routes'),
    controller = require('./config/controller');

Context.registerStore(PostStore);
Context.registerStore(PageStore);

function App(options) {
    options = options || {};
    var fetcher = options.fetcher,
        initialState = options.initialState;
    debug('Creating context');
    this.context = new Context({
        fetcher: fetcher,
        routes: controller.getRoutes()
    });
    if (initialState) {
        bootstrapDebug('rehydrating context');
        this.context.rehydrate(initialState);
    }
}

App.prototype.getComponent = function () {
    debug('Creating Page component');
    var appComponent = Application({context: this.context.getComponentContext()});
    debug('Rendering Page component');
    return appComponent;
};

module.exports = App;
module.exports.config = {
    xhrPath: '/api'
}
