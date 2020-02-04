const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        minlength: 3,
        required: true,
        unique:true
    },
    passwordHash:{
        type:String,
        minlength: 3,
        required: true
    },
    blogPosts: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'BlogPostTable'
        }
    ]
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (document , toReturn) => {
        toReturn.id = document._id.toString();
        delete toReturn.__v;
        delete toReturn._id;
        delete toReturn.passwordHash;
        delete toReturn.name;
    }
});

module.exports = mongoose.model('UserTable', userSchema);