import React, { useState, useEffect } from 'react'
import Person from "./Person";
import Search from "./Search";
import axios from "axios";

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')

    useEffect(() =>{
        console.log('effect')
        axios.get('http://localhost:3001/personso').then(response => {
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
        persons.some((i)=>i.name===newName)?window.alert(`${newName} is already present in the phonebook`): setPersons(persons.concat({name:newName, number: newNumber}))
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