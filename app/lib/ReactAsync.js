var invariant = require('react/lib/invariant');
var ReactAsync = require('react-async');

var Mixin = {

    getInitialState: function () {
        return this.getStateFromStores();
    },

    componentDidMount: function () {

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
    },

    _onStateReady: function (err, asyncState) {
        if (err) {
            throw err;
        }

        if (this.isMounted()) {
            this.setState(asyncState || {});
        }
    }
};

if (!ReactAsync.renderComponentToStringWithAsyncState) {
    ReactAsync.Mixin = Mixin;
}

module.exports = ReactAsync;