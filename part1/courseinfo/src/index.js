import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content part={part1} exercise ={exercises1}/>
            <Content part={part2} exercise={exercises2}/>
            <Content part={part3} exercise={exercises3}/>
            <Footer exercise1={exercises1} exercise2={exercises2} exercise3 ={exercises3}/>
        </div>
    )
}

const Header = ({course})=> <h1>{course}</h1>

const Content = ({part, exercise}) => {
    return(
        <div>
            {part}{exercise}
        </div>
    )
}

const Footer = ({exercise1,exercise2,exercise3})=>{

    return(
        <div>
            Number of exercises {exercise1+exercise2+exercise3}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))