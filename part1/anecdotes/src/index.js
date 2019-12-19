import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Anecdotes from "./Anecdotes";

ReactDOM.render(
    <App anecdotes={Anecdotes} />,
    document.getElementById('root')
)