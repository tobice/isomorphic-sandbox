var _ = require('underscore');


/**
 * Simple MVC controller that can be converted into routr-compatible routes.
 * @param {Object.<string, callback>} actions - Controller actions
 * @constructor
 */
function Controller(actions) {
    this.actions = actions;
}

/**
 * Exports list of routr-compatible routes from the controller.
 * @returns {Object} associative array of routes
 */
Controller.prototype.getRoutes = function () {
    var routes = {};

    for (var name in this.actions) {
        if (this.actions.hasOwnProperty(name)) {
            routes[name] = this.makeRoute(name, this.actions[name]);
        }
    }

    return routes;
};

/**
 * From name and function declaration creates a route object for routr.
 *
 * @param {string} name
 * @param {function} action
 * @returns {{path: string, method: string, action: *}}
 */
Controller.prototype.makeRoute = function (name, action) {
    return {
        path: this.makePath(name, this.getFunctionParameters(action)),
        method: 'get',
        action: function (context, route, done) {

            // Prepare the environment for the controller action.
            var env = {
                context: context,
                fetcher: context.fetcher,
                route: route,
                view: name,
                data: {}
            };

            // The function that has to be called at the end of the controller
            // action, when all data is fetched.
            env.done = function() {
                var payload = {
                    route: route,
                    view: env.view,
                    data: env.data
                };
                context.dispatch('UPDATE_PAGE', payload);
                done();
            };

            // Call the controller action with given environment (accessible
            // through "this") and request params as action params.
            action.apply(env, _.values(route.params));
        }
    };
};

/**
 * From name and list of parameters creates route path.
 *
 * @param {string} name
 * @param {Array} parameters
 * @returns {string}
 */
Controller.prototype.makePath = function (name, parameters) {
    var path = name === 'home' ? '/'  : '/' + name;
    parameters.forEach(function (parameter) {
        path += '/:' + parameter;
    });
    return path;
};


/**
 * Returns list of function parameters.
 *
 * @param {function} fn
 * @returns {Array}
 */
Controller.prototype.getFunctionParameters = function (fn) {
    var args = fn.toString().match(/^\s*function\s+(?:\w*\s*)?\((.*?)\)/);
    args = args ? (args[1] ? args[1].trim().split(/\s*,\s*/) : []) : null;
    return args;
};

/**
 * Returns name of given function. Works just as Function.name which is however
 * not standardized.
 *
 * @param {function} fn
 * @returns {string}
 */
Controller.prototype.getFunctionName = function (fn) {
    var ret = fn.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
};



module.exports = Controller;