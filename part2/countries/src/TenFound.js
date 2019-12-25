import React, {useState} from "react";
import Button from "./Button";

const TenFound = ({found, buttonHandler}) => {

    const [selected, setSelected] = useState(undefined)

    const handler = () => {
        console.log(selected)
        buttonHandler(selected)
    }

    return(
        <ul>
            {found.map(country => <li key={country.callingCodes}>{country.name}
             <Button text={'show info'} handler={handler} /> </li>)}
        </ul>
    )
}

export default TenFound;