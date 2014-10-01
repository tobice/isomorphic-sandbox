'use strict';

var util = require('util');
var BaseStore = require('dispatchr/utils/BaseStore');
var debug = require('debug')('Example:PostStore');

function PostStore(dispatcher) {
    this.dispatcher = dispatcher;
    this.posts = {};
    this.loaded = false;
    this.addingStatus = PostStore.IDLE;
}

PostStore.storeName = 'PostStore';
PostStore.handlers = {
    'RECEIVE_POSTS': 'receivePosts',
    'UPDATE_PAGE': 'clear',
    'SET_POST_ADDING_STATUS': 'setStatus'
};

PostStore.IDLE = 'idle';
PostStore.IN_PROGRESS = 'in_progress';
PostStore.SUCCESS = 'success';
PostStore.ERROR = 'error';

util.inherits(PostStore, BaseStore);

PostStore.prototype.receivePosts = function (posts) {
    this.posts = posts;
    this.loaded = true;
    this.emitChange();
};

PostStore.prototype.clear = function () {
    this.posts = [];
    this.loaded = false;
    this.addingStatus = PostStore.IDLE;
    this.emitChange();
};

PostStore.prototype.setStatus = function (status) {
    this.addingStatus = status;
    this.emitChange();
};

PostStore.prototype.getAll = function () {
    return this.posts;
};

PostStore.prototype.isLoaded = function () {
    return this.loaded;
};

PostStore.prototype.getAddingStatus = function () {
    return this.addingStatus;
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
