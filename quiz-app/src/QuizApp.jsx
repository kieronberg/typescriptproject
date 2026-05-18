import React, { useState } from 'react';
import Header from './components/Header.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Question from './components/Question.jsx';
import Navigation from './components/Navigation.jsx';
import Result from './components/Results.jsx';
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
  const totalQuestions = QUIZ_DATA.length;
  const answeredCount = userAnswers.filter((a) => a !== null).length;
  const progressWidth = (answeredCount / totalQuestions) * 100;

  const handleAnswer = (selectedIndex) => {
    if (userAnswers[currentIndex] !== null) return;

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentIndex] = selectedIndex;
    setUserAnswers(newUserAnswers);

    if (selectedIndex === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (newUserAnswers.every((a) => a !== null)) {
        setIsFinished(true);
      } else if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 900);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers(new Array(totalQuestions).fill(null));
    setIsFinished(false);
  };

  return (
    <div id="quiz-wrapper">
      <div id="quiz-card">
        <Header score={score} total={totalQuestions} />
        <ProgressBar width={progressWidth} />

        {!isFinished ? (
          <div id="quiz-body">
            <Question 
              questionData={currentQuestion}
              currentIndex={currentIndex}
              totalQuestions={totalQuestions}
              userAnswer={userAnswers[currentIndex]}
              onAnswer={handleAnswer}
            />
            <Navigation 
              onPrev={() => setCurrentIndex(currentIndex - 1)}
              onNext={() => setCurrentIndex(currentIndex + 1)}
              disablePrev={currentIndex === 0}
              disableNext={currentIndex === totalQuestions - 1}
            />
          </div>
        ) : (
          <Result 
            score={score} 
            total={totalQuestions} 
            onRestart={restartQuiz} 
          />
        )}
      </div>
    </div>
  );
}