import React, {useState} from "react";
import Button from "./Button";

const App = (props) => {
    const [selected, setSelected] = useState(0)

    const handler = () => setSelected(RandomNumber(props.anecdotes.length))

    return (
        <div>
            <p>{props.anecdotes[selected]} </p>
            <Button text={'Show Random Anecdote'} handler= {handler} />
        </div>
    )
}

const RandomNumber = (b) =>{
    return Math.floor(Math.random()* (b+1))
}

export default  App
