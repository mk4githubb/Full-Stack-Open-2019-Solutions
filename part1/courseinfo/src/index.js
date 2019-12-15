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
            <Content part1 = {part1} exercise1={exercises1} part2 = {part2} exercise2={exercises2} part3 = {part3} exercise3={exercises3}/>
            <Footer exercise1={exercises1} exercise2={exercises2} exercise3 ={exercises3}/>
        </div>
    )
}

const Header = ({course})=> <h1>{course}</h1>

const Content = (props) => {
    return(
        <div>
            <Part part ={props.part1} value ={props.exercise1}/>
            <Part part ={props.part2} value ={props.exercise2}/>
            <Part part ={props.part3} value ={props.exercise3}/>
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

const Part = ({part,value})=>{
    return(
        <div>
            {part} {value}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))