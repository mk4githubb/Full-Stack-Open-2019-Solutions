const express = require('express')
const app = express();


const persons = [
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

app.get("/", (request, response) =>{
    response.send("<h1> Welcome to the PhoneBook!</h1> " +
                       "<p>Navigate to /api/persons tp get the list of all persons</p> ");
})

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

app.get("/info", (request, response) => {
    let toShow  = `<p> Phonebook has info for ${persons.length} people. </p>`+ `<p> ${new Date()}</p>`;
    response.send(toShow)
})

app.listen(3001)
console.log('listening on 3001');
