import React from 'react'

function createMarkup(html) {
  return { __html: html }
}

export default function Question({ questionData, onAnswerClick, showAnswers }) {
  const [answers, setAnswers] = React.useState([])

/* ========================= Making Answers State Objects ========================= */

  React.useEffect(() => {
    const allAnswers = [
      ...questionData.incorrect_answers.map((answer) => (
      {
        text: answer,
        isCorrect: false,
        isChosen: false,
      }
      )),
      {
        text: questionData.correct_answer,
        isCorrect: true,
        isChosen: false,
      },
    ].sort(() => Math.random() - 0.5)

    setAnswers(allAnswers)
  }, [questionData])
  
/* ========================= Quiz Answers ========================= */

  const renderedAnswers = answers.map(({ text, isChosen }, index) => (
    <div
      key={index}
      className={isChosen ? 'answer chosen' : 'answer'}
      onClick={() => handleAnswerClick(index)}
      dangerouslySetInnerHTML={createMarkup(text)}
    />
    ))
    
/* ========================= Answer OnClick function ========================= */

  const handleAnswerClick = (index) => {
    const answer = answers[index]                          

    setAnswers((prevAnswers) =>
      prevAnswers.map((item, idx) => ({
        ...item,
        isChosen: idx === index ? !item.isChosen : false,
      }))
    )

    onAnswerClick(answer)
  }

/* ========================= Rendering Right Answers ========================= */

  const completedAnswers = answers.map(({ text, isChosen, isCorrect }, index) => {
    let style
    if(isChosen && isCorrect){
      style = "answer right"
    }else if(isChosen && !isCorrect){
      style = "answer wrong"
    }else if(isCorrect && !isChosen){
      style = "answer right-blurred"
    }else{
      style = "answer blurred"
    }
    return (
      <div
        key={index}
        className={style}
        dangerouslySetInnerHTML={createMarkup(text)}
      />
    )
  })
  
/* ========================= JSX With Question and Answers ========================= */

  return (
  <div className="quiz-element">
    <div className='question-title'>
      <h4 dangerouslySetInnerHTML={createMarkup(questionData.question)} />
    </div>
    <div className='answer-container'>{showAnswers ? completedAnswers : renderedAnswers}</div>
  </div>
  )
}
