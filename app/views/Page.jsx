/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var RouterMixin = require('flux-router-component').RouterMixin;
var views = require('./views.js');

var Page = React.createClass({
    mixins: [RouterMixin],

    getInitialState: function () {
        this.store = this.props.context.getStore('PageStore');
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
                <ul>
                    <li>
                        <NavLink name="home" context={this.props.context}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink name="about" context={this.props.context}>About</NavLink>
                    </li>
                    <li>
                        <NavLink name="posts" context={this.props.context}>Posts</NavLink>
                    </li>
                </ul>
                <div>
                    {views[this.state.route.config.view]({ context: this.props.context, data: this.state.data })}
                </div>
            </div>
        );
    }
});

module.exports = Page;
