var Controller = require('./lib/Controller');
var loremIpsum = require('lorem-ipsum');

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var controller = new Controller({

    home: function () {
        this.view = 'document';
        this.data = {
            title: 'Isomorphic Sandbox',
            content: 'Welcome on this simple isomorphic page!'
        };
        this.done();
    },

    document: function (title) {
        this.view = 'document';
        this.data = {
            title: title.capitalize(),
            content: loremIpsum({
                count: 2,
                units: 'paragraphs',
                paragraphLowerBound: 3,
                format: 'html'
            })
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
