/** @jsx React.DOM */
var React = require('react');
var Bootstrap = require('react-bootstrap');
var InputH = require('./forms/InputH.jsx');
var Input = require('./forms/Input.jsx');
var FormValidationMixin = require('./forms/FormValidationMixin.js');
var postScheme = require('../schemes/post');

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin, FormValidationMixin],
    propTypes: {
        page: React.PropTypes.string.isRequired
    },

    getInitialState: function () {
        return {
            title: "",
            author: "",
            body: "",
            page: this.props.page
        };
    },

    getValidationScheme: function () {
        return postScheme;
    },

    handleSubmit: function () {
        return false;
    },

    render: function () {
        return (
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <InputH type="text" label="Post title" connect={this.connect('title')} />
                <InputH type="text" label="Your name" connect={this.connect('author')} />
                <InputH type="textarea" label="Text" connect={this.connect('body')} />
                <InputH type="submit" value="Submit post" bsStyle="primary" />
            </form>
        );
    }
});
