import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
    }

    return (
        <div>
            <Header course ={course}/>
            <Content course = {course} />
            <Footer course = {course}/>
        </div>
    )
}

const Header = ({course})=> <h1>{course.name}</h1>

const Content = ({course}) => {
    console.log(course)
    return(
        <div>
            <Part name ={course.parts[0].name} exercises={course.parts[0].exercises} />
            <Part name ={course.parts[1].name} exercises={course.parts[1].exercises} />
            <Part name ={course.parts[2].name} exercises={course.parts[2].exercises} />
        </div>
    )
}

const Footer = ({course})=>{
    return(
        <div>
            Number of exercises {course.parts[0].exercises+ course.parts[1].exercises+ course.parts[2].exercises}
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