/** @jsx React.DOM */
var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = Bootstrap.Input;

var InputH = React.createClass({
    propTypes: {
        connect: React.PropTypes.object
    },

    render: function () {
        var connect = this.props.connect;
        var props = {};
        if (connect) {
            props = {
                valueLink: connect.valueLink,
                bsStyle: connect.bsStyle(),
                help: connect.help()
            };
        }
        return this.transferPropsTo(Input(props));
    }
});

module.exports = InputH;