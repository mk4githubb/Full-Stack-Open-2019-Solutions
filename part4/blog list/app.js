const config = require('./src/utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const routerController = require('./src/controllers/slashBlogsRouter');
const userRouterController = require('./src/controllers/slashUsersRouter');
const cors = require('cors');
const mongoose = require('mongoose');
const middleware = require('./src/utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log('Connected to Database'))
    .catch(()=> console.log(('Error connecting to Database')));


const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', routerController);
app.use('/api/users', userRouterController)
app.use(middleware.errorHandler);

module.exports = app;

