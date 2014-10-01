/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    render: function() {
        if (this.props.test) {
            return this.props.children;
        }
        else {
            return null;
        }
    }
});