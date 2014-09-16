/** @jsx React.DOM */

module.exports = {
    home: {
        path: '/',
        method: 'get',
        content: 'Home Content',
        view: 'home'
    },

    about: {
        path: '/about',
        method: 'get',
        content: 'About Content',
        view: 'about',
        action: function(context, route, done) {
            context.dispatch('UPDATE_PAGE_DATA', { title: "This is title" });
            done();
        }
    },

    posts: {
        path: '/posts',
        method: 'get',
        view: 'posts',
        action: function(context, route, done) {
            context.fetcher.read('post', {}, {}, function (err, posts) {
                context.dispatch('UPDATE_PAGE_DATA', { posts: posts });
                done();
            });
        }
    },

    post: {
        path: '/post/:id',
        method: 'get',
        view: 'post',
        action: function(context, route, done) {
            context.fetcher.read('post', { id: route.params.id }, {}, function (err, post) {
                context.dispatch('UPDATE_PAGE_DATA', post);
                done();
            });
        }
    }
};
