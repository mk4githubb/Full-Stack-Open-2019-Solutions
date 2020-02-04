const blogRouter = require('express').Router();
const blogEntries = require('../models/blogSchema');
const userTable = require('../models/usersSchema');
const blogTable = require('../models/blogSchema');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogRouter.get('/', async (request, response) => {

    const foundEntires = await blogEntries.find({}).populate('author', {'blogPosts':0});
    const x = foundEntires.map(blog => blog.toJSON());
    response.status(200).send(x);
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
            text: request.body.text,
            likes: 0,
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

blogRouter.put('/:id', async (request, response, next) =>{
    const id = request.params.id;

    try{
        const updatedBlog = await blogTable.findByIdAndUpdate(id, {$inc:{likes:1}},{new:true});
        response.status(200).send(updatedBlog.toJSON());
    }
    catch (exception) {
        next(exception);
    }
});





module.exports = blogRouter;
