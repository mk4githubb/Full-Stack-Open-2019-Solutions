import React from "react";

const TenFound = ({found}) => {
    return(
        <ul>
            {found.map(country => <li key={country.callingCodes}>{country.name}</li>)}
        </ul>
    )
}

export default TenFound;