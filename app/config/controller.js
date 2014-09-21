var Controller = require('../lib/Controller');

var controller = new Controller({

    home: function () {
        this.view = 'document';
        this.data = {
            title: 'Isomorphic Sandbox',
            content: 'Home content. Hello'
        };
        this.done();
    },

    about: function () {
        this.view = 'document';
        this.data = {
            title: 'About',
            content: 'About content'
        };
        this.done();
    },

    posts: function () {
        this.fetcher.read('post', {}, {}, function (err, posts) {
            this.data.posts = posts;
            this.done();
        }.bind(this));
    },

    post: function (id) {
        this.fetcher.read('post', {id: id}, {}, function (err, post) {
            this.data = post;
            this.done();
        }.bind(this));
    }
});

module.exports = controller;
