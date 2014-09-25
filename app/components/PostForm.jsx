/** @jsx React.DOM */
var React = require('react');
var Bootstrap = require('react-bootstrap');

var Input = Bootstrap.Input;

module.exports = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function () {
        return {
            title: "",
            author: "",
            body: ""
        };
    },

    handleSubmit: function () {
        console.log(this.state);
        return false;
    },

    render: function () {

        return (
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                <Input type="text" label="Post title" valueLink={this.linkState('title')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="text" label="Your name" valueLink={this.linkState('author')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="textarea" label="Text" valueLink={this.linkState('body')} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="submit" value="Submit post" bsStyle="primary" wrapperClassName="col-xs-offset-2 col-xs-10" />
            </form>
        );
    }
});
