import React from 'react'
import ReactDOM from 'react-dom'
import Courses from "./course";

const App = ({courses}) => {
    return (
        <div>
            {courses.map( (i) => <Course key= {i.id} course={i}/>)}
        </div>
    )
}


const Course = ({course})=>{
    return(
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
            {course.parts.map( (i) => <Part  key = {i.id} name={i.name} exercises={i.exercises}/> )}
        </div>
    )
}

const Footer = ({course})=>{
    return(
        <div>
            Number of exercises {course.parts.reduce(((total, currentValue) => total + currentValue.exercises),0)}
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

ReactDOM.render(<App courses={Courses}/>, document.getElementById('root'))