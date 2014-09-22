'use strict';

var util = require('util');
var BaseStore = require('dispatchr/utils/BaseStore');
var debug = require('debug')('Example:PostStore');

function PostStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.posts = {};
    this.loaded = false;
}

PostStore.storeName = 'PostStore';
PostStore.handlers = {
    'RECEIVE_POSTS': 'receivePosts',
    'UPDATE_PAGE': 'clear'
};

util.inherits(PostStore, BaseStore);

PostStore.prototype.receivePosts = function (posts) {
    this.posts = posts;
    this.loaded = true;
    this.emitChange();
};

PostStore.prototype.getAll = function () {
    return this.posts;
};

PostStore.prototype.isLoaded = function () {
    return this.loaded;
};

PostStore.prototype.clear = function () {
    this.posts = [];
    this.loaded = false;
    this.emitChange();
};

PostStore.prototype.dehydrate = function () {
    return {
        posts: this.posts,
        loaded: this.loaded
    };
};

PostStore.prototype.rehydrate = function (state) {
    this.posts = state.posts;
    this.loaded = state.loaded;
};

module.exports = PostStore;
