import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header course={course}/>
            <Content part1 = {parts[0]} part2 = {parts[1]}  part3 = {parts[2]} />
            <Footer exercise1={parts[0].exercises} exercise2={parts[0].exercises} exercise3 ={parts[0].exercises}/>
        </div>
    )
}

const Header = ({course})=> <h1>{course}</h1>

const Content = (props) => {
    console.log(props)
    return(
        <div>
            <Part name ={props.part1.name} exercises={props.part1.exercises} />
            <Part name ={props.part2.name} exercises={props.part2.exercises} />
            <Part name ={props.part3.name} exercises={props.part3.exercises} />
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

const Part = ({name,exercises})=>{
    console.log(name,exercises)
    return(
        <div>
            {name} {exercises}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))