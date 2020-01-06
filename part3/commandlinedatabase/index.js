const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');

morgan.token('data', function(request){
    return JSON.stringify(request.body);
    }
);
app.use(morgan('::method :url :status :res[content-length] - :response-time ms :data'));

app.use(express.static('build'));

let persons = [
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 1
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 2
    },
    {
        "name": "Mom",
        "number": "123",
        "id": 3
    },
    {
        "name": "mk",
        "number": "mk",
        "id": 4
    }
]

const getNextID = () => {
    if(persons.length == 0){
        return 0;
    }
    return Math.max(...persons.map(i => i.id)) + 1
};

app.get("/", (request, response) =>{
    response.send("<h1> Welcome to the PhoneBook!</h1> " +
                       "<p>Navigate to /api/persons tp get the list of all persons</p> ");
});

app.get("/api/persons", (request, response ) =>{
    response.json(persons);
});

app.get("/api/persons/:id", (request, response)=> {
    let id = request.params.id;
    let found = persons.find(person => person.id === Number(id));

    console.log(found)
    if(found){
        response.json(found)
    }
    else{
        response.status(404).end();
    }
});

app.post("/api/persons/", (request, response)=>{
    console.log(request.body);
    const data = request.body;
    if(!data.name || !data.number){
        return response.status(400).json({
            error: 'content missing'
        });
    }

    if(persons.some(i => i.name === data.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const content = {
        "name": data.name,
        "number": data.number,
        "id": getNextID()
    }
    persons = persons.concat(content);
    response.status(200).json(content);
})

app.delete("/api/persons/:id", (request, response)=>{
    let id = Number(request.params.id);
    let found = persons.find(person => person.id === id);

    if(found){
        persons = persons.filter(person => person.id !== id);
        console.log(persons)
        return response.status(200).end();
    }
    else {
        return response.status(404).end();
    }
});

app.get("/info", (request, response) => {
    let toShow  = `<p> Phonebook has info for ${persons.length} people. </p>`+ `<p> ${new Date()}</p>`;
    return response.send(toShow)
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});