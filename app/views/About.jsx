/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react');

var About = React.createClass({

    render: function () {
        return (
            <div>About Component: {this.props.data.title}</div>
        );
    }
});

module.exports = About;
