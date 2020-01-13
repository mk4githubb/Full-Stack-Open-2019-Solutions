require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('build'));
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


app.get("/api/persons/:id", (request, response , next)=> {
    let id = request.params.id;

    Row.findById(id)
        .then( result => response.status(200).json(result.toJSON()))
        .then(() => console.log('Entry found'))
        .catch(error => {
            next(error)
        })
});

app.post("/api/persons/", (request, response)=>{
    const data = request.body;
    if(!data.name || !data.number){
        return response.status(400).json({
            error: 'content missing'
        });
    }

    var found = Row.findById({name:data.name})

    if(found.length > 1){
        return response.status(400).json({
            error: 'name must be unique'
        });
    }

    const entry = new Row({
        name: data.name,
        number: data.number
    });

    entry.save()
        .then(()=> response.status(200).json(entry.toJSON()))
        .then(() => console.log('contact saved'))
        .catch(() => {
            console.log('Error in saving contact');
            response.status(500).end();
        });
});

app.delete("/api/persons/:id", (request, response , next) => {

    const data = request.params.id;

    Row.findById(data)
        .then(() => Row.findByIdAndRemove(data)
            .then(() => response.status(200).end())
            .then(() => console.log('Contact Deleted'))
            .catch(error => {
                next(error);
            }))
        .catch(() => {
            console.log('No such entry found');
            return response.status(404).end();
        });
});

app.get("/info", (request, response) => {
    let toShow  = `<p> Phonebook has info for ${persons.length} people. </p>`+ `<p> ${new Date()}</p>`;
    return response.send(toShow)
});

app.put('/api/persons/:id', (request , response) =>{

    const newcontact = {
        number: request.body.number
    };

    Row.findByIdAndUpdate(request.params.id , newcontact, {new : true})
        .then(result => response.json(result.toJSON()))
        .then(() => console.log('Contact Updated'))
        .catch( error => {
            console.log('Error occoured while updating the contact');
            return response.status(501).end();
        })
});

const errorHandler = (error, request, response, next) => {
    if (error.name == 'CastError' && error.kind == 'ObjectId'){
        return response.status(400).send({
            error: 'malformatted id'
        })

        next(error);
    }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});