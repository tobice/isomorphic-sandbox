var Controller = require('./lib/Controller');
var loremIpsum = require('lorem-ipsum');

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var controller = new Controller({

    home: function () {
        this.view = 'page';
        this.data = {
            page: 'home',
            title: 'Isomorphic Sandbox',
            content: 'Welcome on this simple isomorphic page!'
        };
        this.done();
    },

    page: function (page) {
        this.view = 'page';
        this.data = {
            page: page,
            title: page.capitalize(),
            content: loremIpsum({
                count: 2,
                units: 'paragraphs',
                paragraphLowerBound: 3,
                format: 'html'
            })
        };
        this.done();
    }
});

module.exports = controller;
