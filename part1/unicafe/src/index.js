import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <div>
                <div>
                    <h1>give feedback</h1>
                </div>
                <div>
                    <Button text={"Good"} onClick={()=> setGood(good+1)}/>
                    <Button text={"Neutral"} onClick={()=> setNeutral(neutral+1)}/>
                    <Button text={"Bad"} onClick={()=> setBad(bad+1)}/>
                </div>
                <div>
                    <h1>statistics</h1>
                </div>
                <DislayFeedback good={good} bad={bad} neutral={neutral}/>
            </div>
        </div>
    )
}

const Statistics = ({text, value})=>{
    return <p>{text} {value}</p>
}

const Button = ({text,onClick})=>{
    return <button onClick={onClick}>{text}</button>
}

const DislayFeedback = ({good, neutral, bad})=>{
    if(good+neutral+bad <= 0){
        return <p>No Feedback given</p>
    }
    return (
        <div>
            <Statistics text={"Good"} value={good}/>
            <Statistics text={"Bad"} value={bad}/>
            <Statistics text={"Neutral"} value={neutral}/>
            <Statistics text={"All"} value={good+bad+neutral}/>
            <Average good={good} neutral={neutral} bad={bad}/>
            <Positive good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

const Positive = ({good, neutral, bad})=>{
    return (
        <p>Positive: {good*100/(good+bad+neutral)}%</p>
    )
}

const Average = ({good, neutral, bad})=>{
    return (
        <Statistics text={"Average:"} value={(good-bad)/(good+bad+neutral)}/>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)