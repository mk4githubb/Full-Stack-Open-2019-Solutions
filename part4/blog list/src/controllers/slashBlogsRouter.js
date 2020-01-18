const blogRouter = require('express').Router();
const blogEntries = require('../models/blogSchema');
const userTable = require('../models/usersSchema');
const blogTable = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {

    const foundEntires = await blogEntries.find({}).populate('author');
    response.send(foundEntires.map(blog => blog.toJSON()));

});

const getTokenFromRequest = request =>{
    const authorization = request.get('authorization');

    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7);
    }
    return null;
}

blogRouter.post('/', async (request, response, next) => {

    const token = getTokenFromRequest(request);

    try {
        const decodedToken = jwt.verify(token , config.SECRET);

        if(!token || !decodedToken.id){
            next(new Error('TokenError'));
        }

        const foundUser = await userTable.findById(decodedToken.id);

        const newBlog = new blogTable({
            title: request.body.title,
            url: request.body.url,
            author: foundUser._id
        });

        await newBlog.save();

        foundUser.blogPosts = foundUser.blogPosts.concat(newBlog);
        await foundUser.save();
        response.status(200).json(newBlog.toJSON());
    }
    catch (exception) {
        next(exception);
    }


});

module.exports = blogRouter;

