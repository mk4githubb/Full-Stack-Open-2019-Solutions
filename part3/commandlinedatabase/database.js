require('dotenv').config();
const mongoose = require('mongoose');

const URL = process.env.MONGODB_URI;
console.log(typeof URL);

mongoose.connect(URL, {useNewUrlParser : true});

const schema = new mongoose.Schema({
    name: String,
    number: String
});

schema.set('toJSON', {
    transform:(document , returnedObject) =>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
module.exports = mongoose.model('Row', schema);
