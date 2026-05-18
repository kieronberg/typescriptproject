import React, { useState, useEffect } from 'react';
import './QuizApp.css';

const QUIZ_DATA = [
  {
    question: "Which language is used for web styling?",
    answers: ["HTML", "CSS", "Python", "Java"],
    correct: 1,
  },
  {
    question: "Which method adds an element to the end of an array?",
    answers: ["push()", "pop()", "shift()", "splice()"],
    correct: 0,
  },
  {
    question: "What does typeof [] return in JavaScript?",
    answers: ["'array'", "'list'", "'object'", "'undefined'"],
    correct: 2,
  },
  {
    question: "Which keyword declares a typed variable in TypeScript?",
    answers: ["var", "def", "let / const", "dim"],
    correct: 2,
  },
  {
    question: "What does the HTML <script> src attribute do?",
    answers: ["Styles the script tag", "Links an external JS file", "Runs inline code", "Defines a CSS source"],
    correct: 1,
  },
];

export default function QuizApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(QUIZ_DATA.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = QUIZ_DATA[currentIndex];
  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const progressWidth = (answeredCount / QUIZ_DATA.length) * 100;

  // Handle selecting an answer
  const handleAnswer = (selectedIndex) => {
    if (userAnswers[currentIndex] !== null) return; // Prevent re-answering

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = selectedIndex;
    setUserAnswers(newUserAnswers);

    if (selectedIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    // Auto-advance or finish
    setTimeout(() => {
      if (newUserAnswers.every((a) => a !== null)) {
        setIsFinished(true);
      } else if (currentIndex < QUIZ_DATA.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 900);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers(new Array(QUIZ_DATA.length).fill(null));
    setIsFinished(false);
  };

  // Helper for button classes
  const getButtonClass = (index) => {
    const pickedIndex = userAnswers[currentIndex];
    if (pickedIndex === null) return "btn";
    
    if (index === currentQuestion.correct) return "btn correct";
    if (index === pickedIndex) return "btn wrong";
    return "btn";
  };

  return (
    <div id="quiz-wrapper">
      <div id="quiz-card">
        {/* Header - Always Visible */}
        <div id="quiz-header">
          <div id="quiz-label">Quiz App</div>
          <div id="score-badge">
            <span>{score}</span><span id="score-sep">/</span><span>{QUIZ_DATA.length}</span>
          </div>
        </div>
        
        <div id="progress-track">
          <div id="progress-fill" style={{ width: `${progressWidth}%` }}></div>
        </div>

        {!isFinished ? (
          <div id="quiz-body">
            <div id="question-meta">
              <span>Question {currentIndex + 1} of {QUIZ_DATA.length}</span>
            </div>
            <div id="question">{currentQuestion.question}</div>
            
            <div id="answer-buttons" className="btn-grid">
              {currentQuestion.answers.map((text, index) => (
                <button
                  key={index}
                  className={getButtonClass(index)}
                  onClick={() => handleAnswer(index)}
                  disabled={userAnswers[currentIndex] !== null}
                >
                  {text}
                </button>
              ))}
            </div>

            <div id="nav-row">
              <button 
                className="nav-btn" 
                onClick={() => setCurrentIndex(currentIndex - 1)} 
                disabled={currentIndex === 0}
              >
                ← Prev
              </button>
              <button 
                className="nav-btn" 
                onClick={() => setCurrentIndex(currentIndex + 1)} 
                disabled={currentIndex === QUIZ_DATA.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
          <div id="result-screen">
            <div className="result-emoji">
              {score === QUIZ_DATA.length ? "🏆" : score >= QUIZ_DATA.length / 2 ? "👏" : "📚"}
            </div>
            <h2>{score === QUIZ_DATA.length ? "Perfect score!" : "Good job!"}</h2>
            <p>
              You scored <strong>{score}</strong> out of <strong>{QUIZ_DATA.length}</strong> correctly.
            </p>
            <button id="restart-btn" onClick={restartQuiz}>Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}