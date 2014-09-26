/** @jsx React.DOM */
var React = require('react');
var Bootstrap = require('react-bootstrap');
var InputH = require('./forms/InputH.jsx');


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
                <InputH type="text" label="Post title" valueLink={this.linkState('title')}  />
                <InputH type="text" label="Your name" valueLink={this.linkState('author')}  />
                <InputH type="textarea" label="Text" valueLink={this.linkState('body')} />
                <InputH type="submit" value="Submit post" bsStyle="primary" />
            </form>
        );
    }
});
