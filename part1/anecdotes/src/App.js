import React, {useState} from "react";
import Button from "./Button";

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const randomAnecdote = () => {
        let num = RandomNumber(props.anecdotes.length);
        setSelected(num);
    }

    const voteHandler = ()=>{
        const copy = [...votes]
        console.log(copy)
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <div>
            <p>{props.anecdotes[selected]} </p>
            <p>has {votes[selected]} votes </p>
            <Button text={"Vote"} handler={voteHandler}/>
            <Button text={'Show Random Anecdote'} handler= {randomAnecdote} />
        </div>
    )
}

const RandomNumber = (b) =>{
    return Math.floor(Math.random()* b)
}

export default  App
