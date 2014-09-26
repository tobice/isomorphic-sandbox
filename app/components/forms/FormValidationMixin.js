var _ = require('underscore');
var revalidator = require('revalidator');

var FormValidationMixin = {
    valid: true,
    errors: [],
    dirty: [],

    componentWillReceiveProps: function (nextProps) {
        this.valid = true;
        this.errors = [];
        this.dirty = [];
    },

    componentWillUpdate: function (nextProps, nextState) {
        this.updateDirty(nextState);
        this.validate(nextState);
    },

    /**
     * Update the list of dirty inputs.
     * @param {object} nextState
     */
    updateDirty: function (nextState) {
        for (var key in nextState) {
            if (nextState.hasOwnProperty(key) && this.state.hasOwnProperty(key)) {
                if (nextState[key] != this.state[key]) {
                    if (!_.contains(this.dirty, key)) {
                        this.dirty.push(key);
                    }
                }
            }
        }
    },

    /**
     * Perform validation of the current component state.
     * @param {object} state
     */
    validate: function (state) {
        var validation = revalidator.validate(state, this.getValidationScheme());
        this.valid = validation.valid;
        this.errors = validation.errors;
    },

    /**
     * Return object of connecting functions for given input
     * @param {string} name of input
     * @returns {{linkState: (*|ReactLink), bsStyle: Function, help: Function}}
     */
    connect: function (name) {
        var form = this;

        return {
            valueLink: form.linkState(name),

            bsStyle: function () {
                if (!form.isDirty(name)) {
                    return null;
                }
                var error = form.getError(name);
                return error ? 'error' : 'success';
            },

            help: function () {
                if (!form.isDirty(name)) {
                    return null;
                }
                var error = form.getError(name);
                return error ? error.message : null;
            }
        };
    },

    /**
     * Return error object for given input or null if there is no error.
     * @param {string} name of the input
     * @returns {object|null}
     */
    getError: function (name) {
        var errors = _.where(this.errors, {property: name});
        return errors.length === 0 ? null : errors[0];
    },

    /**
     * Return if given input is dirty.
     * @param {string} name
     * @returns {boolean}
     */
    isDirty: function (name) {
        return _.contains(this.dirty, name);
    }
};

module.exports = FormValidationMixin;