/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react');

var Post = React.createClass({

    render: function () {
        return (
            <div>
                <h2>{this.props.data.title}</h2>
                <div>Post author: {this.props.data.author}</div>
            </div>
        );
    }
});

module.exports = Post;
