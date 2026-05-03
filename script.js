const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const quizData = [
  {
    question: "Which language is used for web styling?",
    answers: ["HTML", "CSS", "Python", "Java"],
    correct: 1
  },
  {
    question: "Which method adds an element to the end of an array?",
    answers: ["push()", "pop()", "shift()", "splice()"],
    correct: 0
  },
  {
    question: "What does typeof [] return in JavaScript?",
    answers: ["'array'", "'list'", "'object'", "'undefined'"],
    correct: 2
  },
  {
    question: "Which keyword declares a typed variable in TypeScript?",
    answers: ["var", "def", "let / const", "dim"],
    correct: 2
  },
  {
    question: "What does the HTML <script> src attribute do?",
    answers: ["Styles the script tag", "Links an external JS file", "Runs inline code", "Defines a CSS source"],
    correct: 1
  }
];

let currentIndex = 0;

function showQuestion(data) {
  // Clear previous answers
  answerButtonsElement.innerHTML = '';
  questionElement.innerText = data.question;

  data.answers.forEach((text, index) => {
    const button = document.createElement('button');
    button.innerText = text;
    button.classList.add('btn');
    button.onclick = () => handleAnswer(index, data.correct);
    answerButtonsElement.appendChild(button);
  });
}

function handleAnswer(selectedIndex, correctIndex) {
  const buttons = answerButtonsElement.querySelectorAll('.btn');

  // Disable all buttons after picking
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === correctIndex) {
    buttons[selectedIndex].style.background = '#d4edda';
    alert('Correct! ✅');
  } else {
    buttons[selectedIndex].style.background = '#f8d7da';
    buttons[correctIndex].style.background = '#d4edda';
    alert(`Wrong! The correct answer was: ${quizData[currentIndex].answers[correctIndex]}`);
  }

  // Move to next question after a short delay
  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizData.length) {
      showQuestion(quizData[currentIndex]);
    } else {
      questionElement.innerText = 'Quiz complete! Refresh to restart.';
      answerButtonsElement.innerHTML = '';
    }
  }, 1000);
}

showQuestion(quizData[currentIndex]);