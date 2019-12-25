import React from "react";

const OneFound = ({country}) => {
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
        </div>
    )
}

export default OneFound;