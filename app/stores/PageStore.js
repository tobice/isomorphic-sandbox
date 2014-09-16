var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('Example:PageStore');

function PageStore(dispatcher) {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.data = {};
    this.pages = {
        home: {
            text: 'Home',
            route: 'home'
        },
        about: {
            text: 'About',
            route: 'about'
        }
    };
}

PageStore.storeName = 'PageStore';
PageStore.handlers = {
    'CHANGE_ROUTE_START': 'handleNavigate',
    'UPDATE_PAGE_DATA': 'handleUpdatePageData'
};

util.inherits(PageStore, EventEmitter);

PageStore.prototype.handleNavigate = function (route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];

    if (pageName === this.getCurrentPageName()) {
        return;
    }

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emit('change');
};

PageStore.prototype.handleUpdatePageData = function (data) {
    this.data = data;
    this.emit('change');
};

PageStore.prototype.getCurrentPageName = function () {
    return this.currentPageName;
};

PageStore.prototype.getState = function () {
    return {
        currentPageName: this.currentPageName,
        currentPage: this.currentPage,
        pages: this.pages,
        route: this.currentRoute,
        data: this.data
    };
};

PageStore.prototype.dehydrate = function () {
    return this.getState();
};

PageStore.prototype.rehydrate = function (state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
    this.data = state.data;
};

module.exports = PageStore;
