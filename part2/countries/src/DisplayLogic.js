import OneFound from "./OneFound";
import TenFound from "./TenFound";
import React, {useState} from "react";

const DisplayLogic = ({results}) =>{

    const [selected, setSelected] = useState(undefined)

    if(selected){
        return <OneFound country={selected}/>
    }
    else if(results.length === 1) {
        return <OneFound country={results[0]}/>
    }
    else if (results.length <= 10){
        return <TenFound found={results} buttonHandler ={setSelected}/>
    }
    else{
        return <p>Too many matches, specify another filter</p>
    }
}

export default DisplayLogic;