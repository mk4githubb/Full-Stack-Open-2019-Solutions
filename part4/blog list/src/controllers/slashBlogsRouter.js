const blogRouter = require('express').Router();
const blogEntries = require('../models/blogSchema');
const userTable = require('../models/usersSchema');
const blogTable = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {

    const foundEntires = await blogEntries.find({}).populate('author', {'blogPosts':0});
    response.send(foundEntires.map(blog => blog.toJSON()));
});

blogRouter.post('/', async (request, response, next) => {

    const token = request.token;

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
        next();
    }
    catch (exception) {
        next(exception);
    }


});

blogRouter.delete('/:id', async (request, response, next) =>{
   const id = request.params.id;
   const token = request.token;

   try{
       const decodedToken = jwt.verify(token, config.SECRET);

       if(!token || !decodedToken.id){
           next(new Error('TokenError'))
       }

       const foundUser = await userTable.findOne({username: decodedToken.username});

       foundUser.blogPosts = foundUser.blogPosts.filter(i => i._id !== id);
       await foundUser.save();
       await blogTable.findByIdAndDelete(id);
       // await blogTable.save();
       response.status(200).end();
   }
   catch (exception) {
       next(exception);
   }

});

module.exports = blogRouter;