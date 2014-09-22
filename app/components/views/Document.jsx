/** @jsx React.DOM */
/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var React = require('react');

var Document = React.createClass({

    render: function () {
        return (
            <div>
                <h1>{this.props.data.title}</h1>
                <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
            </div>
        );
    }
});

module.exports = Document;
