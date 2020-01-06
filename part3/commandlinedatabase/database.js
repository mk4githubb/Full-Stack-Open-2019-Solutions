const mongoose = require('mongoose');

if ( process.argv.length !== 5 ){
    console.log('Please enter the password: ');
    process.exit(0);
}

const password = process.argv[2];
const URL = `mongodb+srv://back_slash:${password}@cluster0-nqsyg.mongodb.net/phonebook?retryWrites=true`;

mongoose.connect(URL, {useNewUrlParser : true});

const schema = new mongoose.Schema({
    name: String,
    number: String
});

const Row = mongoose.model('Row', schema);

const newRow = new Row({
    name: process.argv[3],
    number: process.argv[4]
});

newRow.save()
    .then(() => console.log('Data saved'))
    .catch(() => console.log('Error in saving data'))
    .catch(error => console.log(error));


 const y = Row.find({})
     .then(result => {
         result.forEach( i => console.log(i.name) );
        mongoose.connection.close();
     });
