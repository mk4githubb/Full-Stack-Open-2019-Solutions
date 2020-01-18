const loginRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userTable = require('../models/usersSchema');
const config = require('../utils/config');


loginRouter.post('/', async (request , response , next) =>{

    const loginData = request.body;
    const foundUser = await userTable.findOne({username : loginData.username});

    const isPasswordCorrect = foundUser === null ? false : bcrypt.compare(loginData.password, foundUser.passwordHash );

    if (!(foundUser && isPasswordCorrect)){
        next(new Error('AuthenticationError'))
    }

    const userForToken = {
        username: foundUser.username,
        id: foundUser._id
    };

    const webToken = jwt.sign(userForToken, config.SECRET);

    response.status(200).send({
        webToken,
        username: foundUser.username,
        name: foundUser.name
    })
});

module.exports = loginRouter;