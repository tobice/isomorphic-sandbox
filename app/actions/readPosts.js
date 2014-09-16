/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var debug = require('debug')('Example:readPostsAction');
var PostStore = require('../stores/PostStore');

module.exports = function (context, payload, done) {
    context.fetcher.read('post', {}, {}, function (err, posts) {
        context.dispatch('RECEIVE_POSTS', posts);
        done();
    });
};
