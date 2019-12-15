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
                    <button onClick={()=> setGood(good+1)}>Good</button>
                    <button onClick={()=> setNeutral(neutral+1)}>Neutral</button>
                    <button onClick={()=> setBad(bad+1)}>Bad</button>
                </div>
                <div>
                    <h1>statistics</h1>
                </div>
                <DislayFeedback good={good} bad={bad} neutral={neutral}/>
            </div>
        </div>
    )
}

const DislayFeedback = ({good, neutral, bad})=>{
    if(good+neutral+bad <= 0){
        return <p>No Feedback given</p>
    }
    return (
        <div>
            <p>Good: {good}</p>
            <p>Neutral: {neutral}</p>
            <p>Bad: {bad}</p>
            <p>All: {good+bad+neutral}</p>
            <Average good={good} neutral={neutral} bad={bad}/>
            <Positive good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

const Positive = ({good, neutral, bad})=>{
    if(good+neutral+bad <= 0){
        return <p>Positive: No data</p>
    }
    return (
        <p>Positive: {good*100/(good+bad+neutral)}%</p>
    )
}

const Average = ({good, neutral, bad})=>{
    if(good+neutral+bad <= 0){
        return <p>Average: No data</p>
    }
    return (
        <p>Average: {(good-bad)/(good+bad+neutral)}</p>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)