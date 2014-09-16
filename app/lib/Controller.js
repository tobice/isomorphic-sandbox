
function Controller(actions) {
    this.actions = actions;
}

Controller.prototype.getRoutes = function () {
    var routes = {};

    for (var path in this.actions) {
        var name = this.getFunctionName(this.actions[path]);
        routes[name] = this.makeRoute(name, path, this.actions[path]);
    }

    return routes;
};

Controller.prototype.makeRoute = function(name, path, action) {
    return {
        path: path,
        page: name,
        action: action
    };
};

/**
 * Returns name of given function. Works just as Function.name which is however
 * not standardized.
 *
 * @param {function} fn
 * @returns {string}
 */
Controller.prototype.getFunctionName = function(fn) {
    var ret = fn.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
};

module.exports = Controller;