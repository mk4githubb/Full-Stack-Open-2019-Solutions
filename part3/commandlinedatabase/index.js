require('dotenv').config();
const express = require('express');
const app = express();
// app.use(express.static('build'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Row = require('./database');

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');

morgan.token('data', function(request){
    return JSON.stringify(request.body);
    }
);

app.use(morgan('::method :url :status :res[content-length] - :response-time ms :data'));

app.get("/api/persons", (request, response ) =>{
    Row.find({}).then( result => response.status(200).json(result.map(i => i.toJSON())));
});


//
//  NOT NEEDED, Not changed to accomodate DB
//
// app.get("/api/persons/:id", (request, response)=> {
//     let id = request.params.id;
//     let found = persons.find(person => person.id === (id));
//
//     console.log(found)
//     if(found){
//         response.json(found)
//     }
//     else{
//         response.status(404).end();
//     }
// });

app.post("/api/persons/", (request, response)=>{
    const data = request.body;
    if(!data.name || !data.number){
        return response.status(400).json({
            error: 'content missing'
        });
    }

    var found = Row.find({name:data.name});

    if(found.length > 1){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const entry = new Row({
        name: data.name,
        number: data.number
    });

    entry.save()
        .then(()=> response.status(200).json(entry.toJSON()))
        .then(() => console.log('contact saved'))
        .catch(() => response.status(500).end())
        .catch(() => console.log('Error in saving contact'));
});

app.delete("/api/persons/:id", (request, response) => {

    console.log('Request.param is ', request.params);
    const data = request.params.id;

    Row.findById(data)
        .then(() => Row.findByIdAndRemove(data)
            .then(() => response.status(200).end())
            .then(() => console.log('Contact Deleted'))
            .catch(() => response.status(500).end())
            .catch(() => console.log('Error in deleting contact')))
        .catch(() => response.status(404).end())
        .catch(() => console.log('No such entry found'));
});

app.get("/info", (request, response) => {
    let toShow  = `<p> Phonebook has info for ${persons.length} people. </p>`+ `<p> ${new Date()}</p>`;
    return response.send(toShow)
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});