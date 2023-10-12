import { useState } from "react";

const Question = ({ question, correct_answer, incorrect_answers, onSelectAnswer, selectedAnswer, isSubmitted }) => {
    const allAnswers = [...incorrect_answers, correct_answer];

    // old style {selectedAnswer === answer ? { backgroundColor: '#4D5B9E', color: 'White' } : {}}

    function answerStyle(answer){
      if (!isSubmitted){
         return (selectedAnswer === answer ? { backgroundColor: '#4D5B9E', color: 'White' } : {})
        };
  
      if (answer === correct_answer) return { backgroundColor: '#94D7A2' };
      if (answer === selectedAnswer && answer !== correct_answer) return { backgroundColor: '#F8BCBC' };
      return {};
    };
        
    return (
        <div className="questionList">
            <div className="question">
                <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
                  {allAnswers.map((answer, index) => (
                      <button
                        key={index}
                        style={answerStyle(answer)}
                        onClick={() => onSelectAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                        className="button"
                        disabled={isSubmitted}
                      />  
                  ))}   
                  <hr  className="line"/>             
            </div>
        </div>
        );
      };

export default Question;