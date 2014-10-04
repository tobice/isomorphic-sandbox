/**
 * Revalidator scheme for a Post.
 */
var postScheme = {
    properties: {
        title: {
            description: 'Post title',
            type: 'string',
            required: true,
            allowEmpty: false,
            message: 'Please fill in the title'
        },
        author: {
            description: 'Post author',
            type: 'string',
            required: true,
            allowEmpty: false,
            message: 'Please fill in the author'
        },
        body: {
            description: 'Post text',
            type: 'string',
            required: true,
            allowEmpty: false,
            message: 'Please fill the body of the text'
        },
        page: {
            description: 'Page where the post has been posted',
            type: 'string',
            required: true,
            allowEmpty: false
        }
    }
};

module.exports = postScheme;