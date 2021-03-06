/** @jsx React.DOM */

var React = require('react');
var Posts = require('../Posts.jsx');

var Page = React.createClass({

    render: function () {
        return (
            <div>
                <h1>{this.props.data.title}</h1>
                <div dangerouslySetInnerHTML={{__html: this.props.data.content}} />

                <hr />
                <h3>Posts</h3>

                <Posts context={this.props.context} page={this.props.data.page} />
            </div>
        );
    }
});

module.exports = Page;
