import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number:'999999999' }
    ])
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            {persons.map((person) => <Person key = {person.name} name={person.name} number={person.number}/> )}
        </div>
    )
}

const Person  = ({name,number})=> <p> {name} : {number}</p>

export default App