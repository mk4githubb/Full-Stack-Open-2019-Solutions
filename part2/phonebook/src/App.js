import React, { useState } from 'react'

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [ newName, setNewName ] = useState('')

    const textChangeHandler = (event)=>{
        event.preventDefault()
        setNewName(event.target.value)
    }

    const submitHandler = (event)=>{
        event.preventDefault()
        persons.some((i)=>i.name===newName)?window.alert(`${newName} is already present in the phonebook`): setPersons(persons.concat({name:newName}))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={submitHandler}>
                <div>
                    name: <input value={newName} onChange={textChangeHandler}  />
                </div>
                <div>
                    <button type="submit" >add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => <Person key = {person.name} name={person.name}/> )}
        </div>
    )
}

const Person  = ({name})=> <p> {name} </p>

export default App