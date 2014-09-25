/** @jsx React.DOM */
var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var ReactFluxAsync = require('../lib/ReactFluxAsync.js');
var NavLink = require('flux-router-component').NavLink;
var actionReadPosts = require('../actions/readPosts');

module.exports = React.createClass({
    mixins: [ReactFluxAsync.Mixin],

    props: {
        context: React.PropTypes.object,
        page: React.PropTypes.string
    },

    init: function () {
        this.context = this.props.context;
        this.PostStore = this.context.getStore('PostStore');
    },

    initStoresAsync: function (done) {
        if (!this.PostStore.isLoaded()) {
            this.context.executeAction(actionReadPosts, {page: this.props.page}, done);
        } else {
            done();
        }
    },

    getStateFromStores: function () {
        return {
            posts: this.PostStore.getAll(),
            loaded: this.PostStore.isLoaded()
        }
    },

    componentWillReceiveProps: function (nextProps) {
        nextProps.context.executeAction(actionReadPosts, {page: nextProps.page});
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
                <p className="well">
                    <i className="fa fa-spinner fa-spin"></i> <i>Loading posts...</i>
                </p>
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
                            <h4>{post.title} <small> (by {post.author})</small> </h4>
                            <p>{post.body}</p>
                        </div> )
                }.bind(this))}
            </div> );
    }
});


