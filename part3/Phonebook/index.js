const express = require('express')
const app = express();


const persons = [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
]

app.get("/", (request, response) =>{
    response.send("<h1> Welcome to the PhoneBook!</h1> " +
                       "<p>Navigate to /api/persons tp get the list of all persons</p> ");
})

app.get("/api/persons", (request, response ) =>{
    response.json(persons);
});

app.get("/info", (request, response) => {
    let toShow  = `<p> Phonebook has info for ${persons.length} people. </p>`+ `<p> ${new Date()}</p>`;
    response.send(toShow)
})

app.listen(3001)
console.log('listening on 3001');
