
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        maxlength: 50,
        required: true
    },
    url: String,
    likes: Number,
    author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'UserTable',
        required: true
    }
});

blogSchema.set('toJSON', {
    transform:(document, toReturn) =>{
        toReturn.id = document._id.toString();
        delete toReturn.__v;
        delete toReturn._id;
    }
});

module.exports = mongoose.model('BlogPostTable', blogSchema);