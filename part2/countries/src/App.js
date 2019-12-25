import React, {useEffect, useState} from "react";
import axios from 'axios'
import TenFound from "./TenFound";
import OneFound from "./OneFound";

const App = () => {
    const [searchFeild, setSearchFeild ] = useState("")
    const [data , setData]  = useState([])
    const [foundResults , setFoundResults] = useState([])

    useEffect(()=>{
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => alert(error))
    },[])

    const searchFieldHandler = (event) =>{
        event.preventDefault();
        setSearchFeild(event.target.value)
        const results = data.filter(country => {
            return country.name.toLowerCase().includes(event.target.value.toLowerCase())});
        setFoundResults(results);
    }

    const DisplayLogic = () =>{
        if(foundResults.length === 1) {
            return <OneFound country={foundResults[0]}/>
        }
        else if (foundResults.length <= 10){
            return <TenFound found={foundResults}/>
        }
        else{
            return <p>Too many matches, specify another filter</p>
        }
    }

    return(
        <div>
            <form>
                <label>Find Countries: </label>
                <input value={searchFeild} onChange={searchFieldHandler}/>
            </form>
            <DisplayLogic/>
        </div>
    )
}

export default App;