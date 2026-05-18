import React from 'react';

export default function Question({ questionData, currentIndex, totalQuestions, userAnswer, onAnswer }) {
  const getButtonClass = (index) => {
    if (userAnswer === null) return "btn";
    if (index === questionData.correct) return "btn correct";
    if (index === userAnswer) return "btn wrong";
    return "btn";
  };

  return (
    <>
      <div id="question-meta">
        <span>Question {currentIndex + 1} of {totalQuestions}</span>
      </div>
      <div id="question">{questionData.question}</div>
      
      <div id="answer-buttons" className="btn-grid">
        {questionData.answers.map((text, index) => (
          <button
            key={index}
            className={getButtonClass(index)}
            onClick={() => onAnswer(index)}
            disabled={userAnswer !== null}
          >
            {text}
          </button>
        ))}
      </div>
    </>
  );
}