// Quiz.js
import React, { useEffect, useState } from 'react'
import Question from './Question'
import Loader from './Loader'
import quizData from '../data/data'

export default function Quiz({ apiUrl }) {

/* ========================= React States ========================= */

  const [checkAnswersMessage, setCheckAnswersMessage] = useState('')
  const [data, setData] = useState([])
  const [chosenAnswers, setChosenAnswers] = useState(Array(5).fill(null))
  const [completed, setCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    playAgain()
  }, [apiUrl])

/* ========================= Fetch API ========================= */

  const getNewQuestionsData = () => {
    setIsLoading(true);
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          setData(quizData.results)
        }
        return res.json()
      })
      .then((data) => {
        setData(data.results);
        setIsLoading(false);
      });
  }
  
/* ========================= Checking if answered right ========================= */

  const checkAnswers = () => {
    if (chosenAnswers.every((answer) => answer)) {
      const rightAnswers = chosenAnswers.filter(chosenOne => chosenOne.isCorrect === true);
      const message = `You scored ${rightAnswers.length}/${chosenAnswers.length} answers`;
      setCheckAnswersMessage(message);
      setCompleted(true);
    } else {
      setCheckAnswersMessage('Please answer all questions first');
    }
  }
  
/* ========================= Render of Question Component ========================= */

const handleAnswerClick = (index, answer) => {
  setChosenAnswers((prevAnswers) => {
    const newAnswers = [...prevAnswers]
    newAnswers[index] = answer
    return newAnswers
  })
}

const questions = data.map((item, index) => (
  <Question
  key={index}
  questionData={item}
  showAnswers={completed}
  onAnswerClick={(answer) => handleAnswerClick(index, answer)}
  />
  ))
    
/* ========================= New Game function ========================= */
    
  const playAgain = () => {
    setCompleted(false)
    setChosenAnswers(Array(5).fill(null))
    setCheckAnswersMessage('')
    setData([])
    setIsLoading(true)
    getNewQuestionsData()
  }

/* ========================= Render JSX ========================= */

  return (
    <div className="quiz-container">
      {isLoading ? <Loader /> : questions}
      <div className="bottom-section">
        <p>{checkAnswersMessage}</p>
        {completed ? (
          <button onClick={playAgain}>Play again</button>
        ) : (
          <button onClick={checkAnswers}>Check answers</button>
        )}
      </div>
    </div>
  )
}
