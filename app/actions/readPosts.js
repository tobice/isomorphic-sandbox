/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

module.exports = function (context, payload, done) {

    // Payload may contain fetcher parameters
    var params = payload;

    context.fetcher.read('post', params, {}, function (err, posts) {
        context.dispatch('RECEIVE_POSTS', posts);
        done();
    });
};
