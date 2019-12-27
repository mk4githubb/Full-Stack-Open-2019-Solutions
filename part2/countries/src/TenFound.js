import React from "react";

const TenFound = ({found, handler}) => {

    return(
        <ul>
            {found.map(country => <li key={country.name}>{country.name}
                                <button onClick={() => handler(country)}>show Info</button></li>)}
        </ul>
    )
}

export default TenFound;