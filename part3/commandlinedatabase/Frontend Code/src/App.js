import React, { useState, useEffect } from 'react'
import Person from "./Person";
import Search from "./Search";
import services from "./Services";
import Notification from "./Notification";

const App = () => {
    const [ persons, setPersons] = useState([])
    const [ newName, setNewName ] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() =>{
        services.getAll().then(response => {
            setPersons(response.data);
        })
            .catch(error => {
                setNotification("Error happened while retrieving the Data");
                setTimeout(() => setNotification(null));
            } )
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
            services.update(foundPerson.id, {name: newName, number: newNumber})
                .then(response => {
                    let filtered = persons.filter( i => i.id !== foundPerson.id)
                    setPersons(filtered.concat(response.data))
                    setNotification(`updated ${newName}`)
                    setTimeout(()=> setNotification(null), 2000);
                })
                .catch(() => {
                    setNotification("Note has already been removed")
                    setTimeout(() => setNotification(null),2000)
                });
        }
        else{
            services.add({name: newName, number: newNumber})
                .then(response => {
                    setPersons(persons.concat(response.data));
                    setNotification(`added ${newName}`)
                    setTimeout(()=> setNotification(null), 2000);
                })
                .catch(error => {
                    setNotification(`Error!! Contact not saved. Please try again later!`)
                    setTimeout(()=> setNotification(null), 10000);

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
            .catch(error => {
                setNotification("Note has already been removed");
                setTimeout(() => setNotification(null),2000)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification text = {notification}/>
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