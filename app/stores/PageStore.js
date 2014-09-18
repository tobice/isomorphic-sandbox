var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('Example:PageStore');

function PageStore(dispatcher) {
    this.route = null;
    this.view = '';
    this.data = {};
}

PageStore.storeName = 'PageStore';
PageStore.handlers = {
    'UPDATE_PAGE_DATA': 'handleUpdatePageData',
    'UPDATE_PAGE': 'handleUpdatePage'
};

util.inherits(PageStore, EventEmitter);

PageStore.prototype.handleUpdatePageData = function (data) {
    this.data = data;
    this.emit('change');
};

PageStore.prototype.handleUpdatePage = function (payload) {
    this.route = payload.route;
    this.view = payload.view;
    this.data = payload.data;
    this.emit('change');
};

PageStore.prototype.getState = function () {
    return {
        route: this.route,
        view: this.view,
        data: this.data
    };
};

PageStore.prototype.dehydrate = function () {
    return this.getState();
};

PageStore.prototype.rehydrate = function (state) {
    this.route = state.route;
    this.view = state.view;
    this.data = state.data;
};

module.exports = PageStore;
