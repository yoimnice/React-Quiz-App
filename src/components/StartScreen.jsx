import React from 'react'

export default function StartScreen({start}){
    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Welcome to the quiz App</p>
            <button onClick={start}>Start quiz</button>
        </div>
    )
}