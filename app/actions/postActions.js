var PostStore = require('../stores/PostStore');

var postActions = {
    // Universal config
    config: {},

    /**
     * @param {object} context
     * @param {number} page to load posts for
     * @param {callback} done
     */
    read: function (context, page, done) {
        context.fetcher.read('post', { page: page }, this.config, function (err, posts) {
            context.dispatch('RECEIVE_POSTS', posts);
            done();
        });
    },

    /**
     * @param {object} context
     * @param {object} newPost new post to add
     * @param {callback} done
     */
    create: function (context, newPost, done) {
        context.dispatch('SET_POST_ADDING_STATUS', PostStore.IN_PROGRESS);
        context.fetcher.create('post', {}, newPost, this.config, function (err, posts) {
            if (err) {
                context.dispatch('SET_POST_ADDING_STATUS', PostStore.ERROR);
                return done(err);
            }
            context.dispatch('SET_POST_ADDING_STATUS', PostStore.SUCCESS);
            context.dispatch('RECEIVE_POSTS', posts);
            return done();
        });
    }
};

module.exports = postActions;