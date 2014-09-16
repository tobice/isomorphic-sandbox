'use strict';

var util = require('util');
var BaseStore = require('dispatchr/utils/BaseStore');
var debug = require('debug')('Example:PostStore');

function PostStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.posts = {};
}

PostStore.storeName = 'PostStore';
PostStore.handlers = {
    'RECEIVE_POSTS': 'receivePosts'
};

util.inherits(PostStore, BaseStore);

PostStore.prototype.receivePosts = function (posts) {
    var self = this;
    posts.forEach(function (post) {
        self.posts[post.id] = post;
    });
    self.emitChange();
};

PostStore.prototype.getAll = function () {
    return this.posts;
};

PostStore.prototype.get = function (id) {
    return this.posts[id];
};

PostStore.prototype.dehydrate = function () {
    return {
        posts: this.posts,
    };
};

PostStore.prototype.rehydrate = function (state) {
    this.posts = state.posts;
};

module.exports = PostStore;
