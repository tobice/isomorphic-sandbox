/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var Navigation = require('./Navigation.jsx');
var RouterMixin = require('flux-router-component').RouterMixin;
var views = require('../views.js');

var Application = React.createClass({
    mixins: [RouterMixin],

    getInitialState: function () {
        this.store = this.props.context.getStore('ApplicationStore');
        return this.store.getState();
    },

    componentDidMount: function () {
        var self = this;
        self._changeEventListener = function () {
            var state = self.store.getState();
            self.setState(state);
        };
        self.store.on('change', self._changeEventListener);
    },

    componentWillUnmount: function () {
        var self = this;
        self.store.removeListener('change', self._changeEventListener);
        self._changeEventListener = null;
    },

    render: function () {
        return (
            <div>
                <Navigation context={this.props.context} />
                <div className="container">
                    <div className="row">
                        {views[this.state.view]({context: this.props.context, data: this.state.data})}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Application;
