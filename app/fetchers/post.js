'use strict';

var _ = require('underscore');

var postId = 0;
var _posts = [{
    id: ++postId,
    title: "How to build an isomorphic app.",
    author: "spike",
    body: "It's really not that hard!",
    created_at: "2013-11-05T13:56:15.034Z",
}, {
    id: ++postId,
    title: "Why JavaScript is eating the world.",
    author: "spike",
    body: "It's the lingua franca of the web.",
    created_at: "2013-11-04T17:23:01.329Z",
}];

module.exports = {
    name: 'post',

    read: function (req, resource, params, config, callback) {
        setTimeout(function () {
            if (params.id !== undefined) {
                for (var i in _posts) {
                    var post = _posts[i];
                    if (post.id == params.id) {
                        callback(null, JSON.parse(JSON.stringify(post)));
                        return;
                    }
                }
                callback(new Error);
            }
            else {
                callback(null, JSON.parse(JSON.stringify(_posts)));
            }
        }, 10);
    },

    create: function (req, resource, params, body, config, callback) {
        _posts.push({
            id: ++postId,
            title: params.title,
            author: params.author,
            body: params.body,
            created_at: params.timestamp
        });
        setTimeout(function () {
            callback(null, _posts);
        }, 10);
    }
    //update: function(resource, params, body, config, callback) {},
    //del: function(resource, params, config, callback) {}

};
