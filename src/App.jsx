import { useEffect, useState } from "react"
import Question from "./components/Question"
import { nanoid } from "nanoid"
import blob from "./assets/blobs.png"
import blob2 from "./assets/blobs2.png"

function App() {

  const [quizQuestions, setQuizQuestions] = useState([])
  const [startQuiz, setStart] = useState(true)
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [finalScore, setScore] = useState(null)
  const [complete, setComplete] = useState(false)


  
  async function getQuestions(){
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    const data = await response.json()   
    setQuizQuestions(data.results)  
  }

  useEffect(()=> {
    getQuestions()
  }, [])

  function handleSelectAnswer(questionIndex, answer, correctAnswer) {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });

  }

  function handleSubmit(){
    let score = 0

    quizQuestions.forEach((question, index) => {
      selectedAnswers[index] === question.correct_answer?
      score += 1:
      score
    })
    setScore(score)
    setComplete(true)
  }

  function handleReset(){
    setComplete(false)
    setScore(null)
    getQuestions()
  }

  const quizElements = quizQuestions.map((elem, index) => (
    <Question
      key={nanoid()}
      question={elem.question}
      correct_answer={elem.correct_answer}
      incorrect_answers={elem.incorrect_answers}
      onSelectAnswer={(answer) => handleSelectAnswer(index, answer)}
      selectedAnswer={selectedAnswers[index]}
      isSubmitted={complete}
    />
  ))



  const handleClickStartQuiz = () => {
    setStart(false)
  }

  return (
    <div className='background'>
      <img className="blob1" src={blob} alt="" />
      <img className="blob2" src={blob2} alt="" />
    {startQuiz ? (
      <div className='hero'>
        <h1>Quizzical</h1>
        <p>Test your general knowledge skills with these 5 questions!</p>
        <button onClick={handleClickStartQuiz}>Start Quiz</button>
      </div>) : 
    (
      
      <div className="quizQuestions">
        {quizElements}
        {complete? (
        <div className="alignButton"> 
        <p>You have scored {finalScore}/5</p>
        <button className="buttonSubmit" onClick={handleReset}>Play Again?</button>
        </div>
        ) : 
        (<div className="alignButton">
          <button className="buttonSubmit" onClick={handleSubmit}>Check Answers</button></div>
        )
        }
      </div>
     
    )}
    </div>
    
  )
}

export default App
