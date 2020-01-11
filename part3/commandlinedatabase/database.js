const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser : true})
    .then(() => console.log("Connection Established"))
    .catch(() => console.log("Connection Error"));

const Schema = new mongoose.Schema({
    name: String,
    number: String
});

Schema.set('toJSON', {
    transform: ( document , toReturn) => {
    toReturn.id = document._id.toString();
    delete toReturn._id
    delete toReturn.__v
}

});

module.exports = mongoose.model('Row', Schema);