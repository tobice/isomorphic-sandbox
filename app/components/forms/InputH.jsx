/** @jsx React.DOM */
var React = require('react');
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
                wrapperClassName: "col-md-offset-" + labelWidth + " col-md-" + wrapperWidth
            };
        } else {
            props = {
                labelClassName: "col-md-" + labelWidth,
                wrapperClassName: "col-md-" + wrapperWidth
            }
        }
        return this.transferPropsTo(Input(props));
    }
});

module.exports = InputH;