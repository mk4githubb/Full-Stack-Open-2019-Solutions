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
            if(!window.confirm(`${newName} is already present in the phonebook, replace the old number with a new one?`)){
                return;
            }

            let foundPerson  = persons.find(i => i.name === newName)
            console.log(foundPerson.id, foundPerson)
            services.update(foundPerson.id, {name: newName, number: newNumber})
                .then(response => {
                    console.log(response.data)
                    let filtered = persons.filter( i => i.id !== foundPerson.id)
                    setPersons(filtered.concat(response.data))
                })
        }
        else{
            services.add({name: newName, number: newNumber})
                .then(response => {
                    console.log(response.data)
                    setPersons(persons.concat(response.data))
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const deleteHandler = (id) => {
        if(!window.confirm(`would you like to delete ${persons.find(i => i.id === id).name}`)){
            return;
        }
        services.delContact(id)
            .then(() => setPersons(persons.filter(i => i.id !== id)))
            .catch(()=> alert('Error has occoured!'))
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
            {persons.map((person) => <li key = {person.id} ><Person  name={person.name} number={person.number}/>
                                                            <Button text={'Delete'} handler={() => deleteHandler(person.id)} /> </li>)}
        </div>
    )
}

const Button = ({text,handler})=> <button onClick={handler}>{text}</button>

export default App