import React, { useState, useEffect } from 'react'
import Person from "./Person";
import Search from "./Search";
import services from "./Services";

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() =>{
        console.log('effect')
        services.getAll().then(response => {
            setPersons(response.data);
        })
            .catch(error => window.alert(error))
    },[])

    const textChangeHandler = (event)=>{
        event.preventDefault()
        setNewName(event.target.value)
    }

    const numberChangeHandler = (event)=>{
        event.preventDefault()
        setNewNumber(event.target.value)
    }

    const submitHandler = (event)=>{
        event.preventDefault()
        if(persons.some((i)=>i.name===newName)){
            window.alert(`${newName} is already present in the phonebook`)
            return;
        }
        else{
            console.log(JSON.stringify({newName, newNumber}))
            services.add({name: newName, number: newNumber})
                .then(response => {
                    console.log(response.data)
                    setPersons(persons.concat(response.data))
                })
        }
        setNewName('')
        setNewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Search collection={persons}/>
            <h2>Add a new</h2>
            <form onSubmit={submitHandler}>
                <div>
                    Name: <input value={newName} onChange={textChangeHandler}  />
                    <br/>
                    Number: <input value={newNumber} onChange={numberChangeHandler}  />
                </div>
                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => <Person key = {person.id} name={person.name} number={person.number}/> )}
        </div>
    )
}

export default App