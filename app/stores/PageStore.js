var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('Example:PageStore');

function PageStore(dispatcher) {
    this.currentRoute = null;
    this.data = {};
}

PageStore.storeName = 'PageStore';
PageStore.handlers = {
    'CHANGE_ROUTE_START': 'handleNavigate',
    'UPDATE_PAGE_DATA': 'handleUpdatePageData'
};

util.inherits(PageStore, EventEmitter);

PageStore.prototype.handleNavigate = function (route) {
    this.currentRoute = route;
    this.emit('change');
};

PageStore.prototype.handleUpdatePageData = function (data) {
    this.data = data;
    this.emit('change');
};

PageStore.prototype.getState = function () {
    return {
        route: this.currentRoute,
        data: this.data
    };
};

PageStore.prototype.dehydrate = function () {
    return this.getState();
};

PageStore.prototype.rehydrate = function (state) {
    this.currentRoute = state.route;
    this.data = state.data;
};

module.exports = PageStore;
