var invariant = require('react/lib/invariant');
var ReactAsync = require('react-async');

var Mixin = ReactAsync.Mixin;

/**
 * ReactAsync mixin modified to support Flux stores.
 */

// Simple detection whether the module is for client side.
if (!ReactAsync.renderComponentToStringWithAsyncState) {

    Mixin.getInitialState = function () {
        return this.getStateFromStores();
    };

    Mixin.componentDidMount = function () {

        invariant(
            typeof this.getInitialStateAsync === 'function',
            "%s uses ReactAsync.Mixin and should provide getInitialStateAsync(cb) method",
            this.displayName
        );

        var cb = this._onStateReady;
        var promise = this.getInitialStateAsync(cb);

        if (promise && promise.then) {
            promise.then(cb.bind(this, null), cb);
        }
    };

    Mixin._onStateReady = function (err, asyncState) {
        if (err) {
            throw err;
        }

        if (this.isMounted()) {
            this.setState(asyncState || {});
        }
    };
}

Mixin.getInitialStateAsync = function (done) {

    invariant(
        typeof this.initStoresAsync === 'function',
        "%s uses ReactFluxAsync.Mixin and should provide initStoresAsync() method",
        this.displayName
    );

    invariant(
        typeof this.getStateFromStores === 'function',
        "%s uses ReactFluxAsync.Mixin and should provide getStateFromStores() method",
        this.displayName
    );

    this.initStoresAsync(function () {
        done(null, this.getStateFromStores());
    }.bind(this));
};

Mixin.originalGetInitialState = Mixin.getInitialState;

Mixin.getInitialState = function() {

    if (typeof this.init === 'function') {
        this.init();
    }

    return this.originalGetInitialState();
};

module.exports = ReactAsync;