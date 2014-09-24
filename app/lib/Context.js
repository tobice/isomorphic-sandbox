var Dispatcher = require('dispatchr')();
var Router = require('routr');
var _ = require('underscore');

function Context(options) {
    options = options || {};
    this.dispatcher = new Dispatcher({});
    this.router = new Router(options.routes);
    this.fetcher = options.fetcher || null;
    this.actionContext = this.getActionContext();
    this.componentContext = this.getComponentContext();
}

Context.registerStore = Dispatcher.registerStore.bind(Dispatcher);

Context.prototype.getComponentContext = function () {
    var self = this;
    return {
        executeAction: function (actionController, payload, done) {
            actionController(self.actionContext, payload, function (err, data) {
                if (err) {
                    console.error(err);
                }

                if (_.isFunction(done)) {
                    done(err, data);
                }
            });
        },
        getStore: self.dispatcher.getStore.bind(self.dispatcher),
        makePath: self.router.makePath.bind(self.router)
    }
};

Context.prototype.getActionContext = function () {
    var self = this;
    return {
        dispatch: self.dispatcher.dispatch.bind(self.dispatcher),
        executeAction: function (actionController, payload, done) {
            actionController(self.actionContext, payload, done);
        },
        fetcher: self.fetcher,
        getStore: self.dispatcher.getStore.bind(self.dispatcher),
        router: self.router
    }
};

Context.prototype.dehydrate = function () {
    return {
        dispatcher: this.dispatcher.dehydrate()
    };
};

Context.prototype.rehydrate = function (obj) {
    this.dispatcher.rehydrate(obj.dispatcher || {});
};

module.exports = Context;
