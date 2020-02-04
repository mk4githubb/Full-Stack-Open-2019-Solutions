const router = require('express').Router();
const userTable = require('../models/usersSchema');
const bcrypt = require('bcrypt');

router.get('/', async (request , response , next) => {

    const foundResult = await userTable.find({}).populate('blogPosts');
    response.status(200).json(foundResult.map(user => user.toJSON()));

});

router.get('/:id', async (request , response , next) => {
    const id = request.params.id
    const foundResult = await userTable.findById(id).populate('blogPosts');
    response.status(200).json(foundResult => foundResult.toJSON());
});

router.post('/', async (request , response , next) => {
    try{
        const data = request.body;
        const passwordHash = await bcrypt.hash(data.password, 10);
        const entry = new userTable({
            username: data.username,
            name:data.name,
            passwordHash
        });

        const addedUser = await entry.save();
        response.status(200).json(addedUser);
    }
    catch (exception) {
        next(exception)
    }
});

module.exports = router;