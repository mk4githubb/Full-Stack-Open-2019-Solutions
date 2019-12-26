import React, {useEffect, useState} from "react";
import axios from 'axios'

const OneFound = ({country}) => {

    const [data , setData] = useState(undefined)

    useEffect(() =>{
    axios.get("http://api.weatherstack.com/current" +
            "? access_key = 6c6b18869fd8e5a954450798de1dd2cd"+
            "& query = New York")
            .then(response => {
                console.log(response.data)
                return setData(response.data)})
            .catch(error => window.alert("Weather Not available"))},[]);

    return(
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
            </ul>
            <img src = {country.flag} alt={`${country.name}'s flag`} />
            <h2>Weather in {country.capital}</h2>
            {/*<h3>Temprature: {data.current.temprature}</h3>*/}


        </div>
    )
}

export default OneFound;