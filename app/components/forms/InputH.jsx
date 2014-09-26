/** @jsx React.DOM */
var React = require('react');
var Bootstrap = require('react-bootstrap');
var Input = require('./Input.jsx');

/**
 * Horizontal Input. Automatically adds Bootstrap wrappers and labels around the
 * input to make the form horizontal.
 *
 * @property {number} labelWidth size of the label column (1-12)
 */
var InputH = React.createClass({
    propTypes: {
        labelWidth: React.PropTypes.number
    },

    render: function () {
        var labelWidth = this.props.labelWidth || 2;
        var wrapperWidth = 12 - labelWidth;
        var props = {};

        if (this.props.type === "submit") {
            props = {
                labelClassName: "",
                wrapperClassName: "col-xs-offset-" + labelWidth + " col-xs-" + wrapperWidth
            };
        } else {
            props = {
                labelClassName: "col-xs-" + labelWidth,
                wrapperClassName: "col-xs-" + wrapperWidth
            }
        }
        return this.transferPropsTo(Input(props));
    }
});

module.exports = InputH;