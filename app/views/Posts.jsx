/** @jsx React.DOM */
var React = require('react');
var NavLink = require('flux-router-component').NavLink;
var readPosts = require('../actions/readPosts');

module.exports = React.createClass({

    render: function () {
        var posts = [];
        if (this.props.data.posts !== undefined) {
            for (var key in this.props.data.posts) {
                if (this.props.data.posts.hasOwnProperty(key)) {
                    posts.push(this.props.data.posts[key]);
                }
            }
        }

        return (
            <div classNames="posts">
                <h1>Posts</h1>
                {posts.map(function(post) {
                    var params = { id: post.id };
                    return <div className="post" key={post.id}>
                        <h2><NavLink name="post" navParams={params} context={this.props.context}>{post.title}</NavLink></h2>
                        <p>{post.body}</p>
                    </div>
                }.bind(this))}
            </div> );
    }
});


