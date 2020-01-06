require('dotenv').config();
const express = require('express');
const app = express();

// app.use(express.static('build'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Row = require('./database');

const morgan = require('morgan');
morgan.token('data', function(request){
    return JSON.stringify(request.body);
    }
);

app.use(morgan('::method :url :status :res[content-length] - :response-time ms :data'));

const cors = require('cors');
app.use(cors());

app.get("/", (request, response) =>{
    response.send([]);
});

app.get("/api/persons", (request, response ) =>{
    Row.find({}).then(result => {
        response.json(result.map(i => i.toJSON()));
    });
});

app.get("/api/persons/:id", (request, response)=> {
    let id = request.params.id;

    let found = Row.findById(id).then(result => result.toJSON());

    console.log(found)
    if(found){
        response.json(found);
    }
    else{
        response.status(404).end();
    }
});

app.post("/api/persons/", (request, response)=>{
    const data = request.body;

    if(!data.name || !data.number){
        return response.status(400).json({
            error: 'content missing'
        });
    }

    let persons = Row.find({name: data.name});
    if(persons.length>0){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const content = new Row (
        {
            name: data.name,
            number: data.number
        }
    );

    content.save().then(() => response.status(200).json(content.toJSON()))
        .catch(() => response.status(400).json({ 'error': 'some error happened while saving'}));
})

app.delete("/api/persons/:id", (request, response)=>{

    console.log(request.body);
    let data = request.body;
    let found = Row.find({name: data.name});
    if(found){
        Row.findByIdAndRemove(data.id)
            .then(result => response.status(200).end())
            .catch(error => console.log(error))

    }
    else {
        return response.status(404).end();
    }
});

app.get("/info", (request, response) => {
    let persons = Row.find({});
    let toShow  = `<p> Phonebook has info for ${persons.length} people. </p>`+ `<p> ${new Date()}</p>`;
    return response.send(toShow)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});