import React, { useState } from 'react'
import defaultAnswers from './answers.json'
import './Eightball.css'

const Eightball = ({answers = defaultAnswers}) => {
    const [answer, setAnswer] = useState('Think of a Question')
    const [color, setColor] = useState('black')
    
    const getAnswer = () => {
        const randomIndex = Math.floor(Math.random() * answers.length)
        const randomAnswer = answers[randomIndex]
        setAnswer(randomAnswer.msg)
        setColor(randomAnswer.color)
    }
    
    return (
        <div className="EightBall" onClick={getAnswer} style={{backgroundColor: color}}>
        <p>{answer}</p>
        </div>
    );
}

export default Eightball
