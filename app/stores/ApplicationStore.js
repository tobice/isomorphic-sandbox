var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('Example:ApplicationStore');

function ApplicationStore(dispatcher) {
    this.route = null;
    this.view = '';
    this.data = {};
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'UPDATE_PAGE_DATA': 'handleUpdatePageData',
    'UPDATE_PAGE': 'handleUpdatePage'
};

util.inherits(ApplicationStore, EventEmitter);

ApplicationStore.prototype.handleUpdatePageData = function (data) {
    this.data = data;
    this.emit('change');
};

ApplicationStore.prototype.handleUpdatePage = function (payload) {
    this.route = payload.route;
    this.view = payload.view;
    this.data = payload.data;
    this.emit('change');
};

ApplicationStore.prototype.getState = function () {
    return {
        route: this.route,
        view: this.view,
        data: this.data
    };
};

ApplicationStore.prototype.dehydrate = function () {
    return this.getState();
};

ApplicationStore.prototype.rehydrate = function (state) {
    this.route = state.route;
    this.view = state.view;
    this.data = state.data;
};

module.exports = ApplicationStore;