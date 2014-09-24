/** @jsx React.DOM */
var React = require('react');
var ReactAsync = require('../lib/ReactAsync.js');
var NavLink = require('flux-router-component').NavLink;
var actionReadPosts = require('../actions/readPosts');

module.exports = React.createClass({
    mixins: [ReactAsync.Mixin],

    props: {
        context: React.PropTypes.object,
        page: React.PropTypes.string
    },

    init: function () {
        this.context = this.props.context;
        this.PostStore = this.context.getStore('PostStore');
    },

    getInitialStateAsync: function (done) {
        this.init();

        if (!this.PostStore.isLoaded()) {
            var payload = {page: this.props.page};
            this.context.executeAction(actionReadPosts, payload, function () {
                done(null, this.getStateFromStores());
            }.bind(this));
        }
        else {
            done(null, this.getStateFromStores());
        }
    },

    getStateFromStores: function () {
        this.init();

        return {
            posts: this.PostStore.getAll(),
            loaded: this.PostStore.isLoaded()
        }
    },

    componentWillMount: function () {
        this.init();
    },

    componentDidMount: function () {
        this.PostStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        this.PostStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(this.getStateFromStores());
    },

    render: function () {

        if (!this.state || !this.state.loaded) {
            return (
                <p className="well"><i>Loading posts...</i></p>
            );
        }

        var posts = this.state.posts;
        if (posts.length == 0) {
            return ( <p className="well">No posts.</p> );
        }

        return (
            <div classNames="posts">
                {posts.map(function(post) {
                    return (
                        <div className="post well" key={post.id}>
                            <h4>{post.title}
                                <small> (by {post.author})</small>
                            </h4>
                            <p>{post.body}</p>
                        </div> )
                }.bind(this))}
            </div> );
    }
});


