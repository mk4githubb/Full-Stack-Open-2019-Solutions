const blogRouter = require('express').Router();
const blogEntries = require('../models/blogSchema')

blogRouter.get('/blogs', (request, response) => {
    blogEntries
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => {
        console.log('Error in querying Data');
        response.status(500).send({
            "error": "Database error while querying data"
        })
    })
});

blogRouter.post('/blogs', (request, response) => {
    const blog = new blogEntries(request.body)
    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
        .then(()=> console.log('Data Saved'))
        .catch(error => {
            console.log('Error in Saving Data');
            console.log(error)
            response.status(500).send({
                "error": "Database error while saving data"
            })
        })
});

module.exports = blogRouter;

