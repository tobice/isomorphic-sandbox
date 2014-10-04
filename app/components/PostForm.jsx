/** @jsx React.DOM */
var React = require('react');

var Bootstrap = require('react-bootstrap');
var Alert = Bootstrap.Alert;
var InputH = require('./forms/InputH.jsx');

var If = require('./If.js');
var FormValidationMixin = require('./forms/FormValidationMixin.js');

var PostStore = require('../stores/PostStore');
var postScheme = require('../schemes/post');
var postActions = require('../actions/postActions');

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin, FormValidationMixin],
    propTypes: {
        context: React.PropTypes.object.isRequired,
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
        this.props.context.executeAction(postActions.create, this.state, function (err) {
            if (!err) {
                this.setState(this.getInitialState());
                this.reset(); // reset validation variables
            }
            this.forceUpdate();
        }.bind(this));
        return false;
    },

    render: function () {
        var status = this.props.context.getStore('PostStore').getAddingStatus();
        var disabled = status == PostStore.IN_PROGRESS;


        return (
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <If test={status == PostStore.ERROR}>
                    <Alert bsStyle="danger">
                        Unfortunately, the post could not be published.
                    </Alert>
                </If>
                <InputH type="text" label="Post title" connect={this.connect('title')} disabled={disabled} />
                <InputH type="text" label="Your name" connect={this.connect('author')} disabled={disabled} />
                <InputH type="textarea" label="Text" connect={this.connect('body')} disabled={disabled} />
                <InputH type="submit" value="Submit post" bsStyle="primary" disabled={disabled || !this.valid} />
            </form>
        );
    }
});
