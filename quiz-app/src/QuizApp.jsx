import React, { useState } from 'react';
import Header from './components/Header.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Question from './components/Question.jsx';
import Navigation from './components/Navigation.jsx';
import Result from './components/Results.jsx';
import './QuizApp.css';

const DEFAULT_QUIZ_DATA = [
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

async function parseQuizJSON(raw) {
  const parsed = await new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(raw));
    } catch (e) {
      reject(new Error(`Invalid JSON: ${e.message}`));
    }
  });

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('Expected a non-empty array of questions.');
  }

  parsed.forEach((q, i) => {
    if (typeof q.question !== 'string')
      throw new Error(`Item ${i}: "question" must be a string.`);
    if (!Array.isArray(q.answers) || q.answers.length < 2)
      throw new Error(`Item ${i}: "answers" must be an array with at least 2 items.`);
    if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= q.answers.length)
      throw new Error(`Item ${i}: "correct" must be a valid index into "answers".`);
  });

  return parsed;
}

export default function QuizApp() {
  const [quizData, setQuizData]     = useState(DEFAULT_QUIZ_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]           = useState(0);
  const [userAnswers, setUserAnswers] = useState(new Array(DEFAULT_QUIZ_DATA.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);

  // JSON paste state
  const [jsonInput, setJsonInput]   = useState('');
  const [jsonError, setJsonError]   = useState('');
  const [jsonSuccess, setJsonSuccess] = useState('');
  const [showPaste, setShowPaste]   = useState(false);

  const currentQuestion = quizData[currentIndex];
  const totalQuestions  = quizData.length;
  const answeredCount   = userAnswers.filter((a) => a !== null).length;
  const progressWidth   = (answeredCount / totalQuestions) * 100;

  const handleLoadJSON = async () => {
    setJsonError('');
    setJsonSuccess('');

    if (!jsonInput.trim()) {
      setJsonError('Please paste your JSON before loading.');
      return;
    }

    try {
      const newData = await parseQuizJSON(jsonInput);
      setQuizData(newData);
      setCurrentIndex(0);
      setScore(0);
      setUserAnswers(new Array(newData.length).fill(null));
      setIsFinished(false);
      setJsonSuccess(`${newData.length} question${newData.length === 1 ? '' : 's'} loaded!`);
      setShowPaste(false);
      setJsonInput('');
    } catch (e) {
      setJsonError(e.message);
    }
  };

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
    setJsonSuccess('');
  };

  return (
    <div id="quiz-wrapper">
      <div id="quiz-card">
        <Header score={score} total={totalQuestions} />
        <ProgressBar width={progressWidth} />

        {/* JSON paste panel */}
        <div id="json-paste-panel">
          <button
            id="toggle-paste-btn"
            onClick={() => { setShowPaste((v) => !v); setJsonError(''); setJsonSuccess(''); }}
          >
            {showPaste ? 'Hide' : 'Load custom quiz (JSON)'}
          </button>

          {showPaste && (
            <div id="paste-area">
              <p className="paste-hint">
                Paste an array of objects with <code>question</code>, <code>answers</code>&nbsp;
                (array), and <code>correct</code> (0-based index).
              </p>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder={'[\n  {\n    "question": "...",\n    "answers": ["A","B","C","D"],\n    "correct": 0\n  }\n]'}
                rows={8}
              />
              <div id="paste-actions">
                <button id="load-json-btn" onClick={handleLoadJSON}>Load quiz</button>
                <button id="clear-json-btn" onClick={() => { setJsonInput(''); setJsonError(''); }}>
                  Clear
                </button>
              </div>
              {jsonError   && <p className="paste-error">{jsonError}</p>}
              {jsonSuccess && <p className="paste-success">{jsonSuccess}</p>}
            </div>
          )}
        </div>

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
          <Result score={score} total={totalQuestions} onRestart={restartQuiz} />
        )}
      </div>
    </div>
  );
}