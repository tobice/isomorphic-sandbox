/** @jsx React.DOM */
var React = require('react');
var OriginalInput = require('../../lib/Input.jsx');

/**
 * Little input extension that allows input to be more easily connected to a
 * form component with FormValidationMixin.
 *
 * @property {object} connect object that encapsulates valueLink, bsStyle
 *  (css class determining input style) and help (help text).
 */
var Input = React.createClass({
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
        return this.transferPropsTo(OriginalInput(props));
    }
});

module.exports = Input;