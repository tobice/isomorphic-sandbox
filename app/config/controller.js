var Controller = require('../lib/Controller');

var controller = new Controller({
    '/post/:id': function post(id) {
        console.log("hello" + id);
    }
});

controller.getRoutes();

