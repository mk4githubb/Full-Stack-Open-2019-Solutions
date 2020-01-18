const blogRouter = require('express').Router();
const blogEntries = require('../models/blogSchema');
const userTable = require('../models/usersSchema');
const blogTable = require('../models/blogSchema');

blogRouter.get('/', async (request, response) => {

    const foundEntires = await blogEntries.find({}).populate('author');
    response.send(foundEntires.map(blog => blog.toJSON()));

});

blogRouter.post('/', async (request, response, next) => {

    try {
        const username = request.body.author;
        console.log('fubdubfg user')

        const foundUser = await userTable.findById(username);
        console.log('user found')

        const newBlog = new blogTable({
            title: request.body.title,
            url: request.body.url,
            author: foundUser._id
        });
        console.log('runnung blog.save')

        await newBlog.save();
        console.log('blogh saved')

        foundUser.blogPosts = foundUser.blogPosts.concat(newBlog);
        console.log('running user.save')
        await foundUser.save();
        console.log('ran useer.save')
        response.status(200).json(newBlog.toJSON());
    }
    catch (exception) {
        console.log('errpr')

        next(exception);
    }


});

module.exports = blogRouter;

