// --- Data: array of objects ---

const quizData = [
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
    answers: [
      "Styles the script tag",
      "Links an external JS file",
      "Runs inline code",
      "Defines a CSS source",
    ],
    correct: 1,
  },
];

// --- State ---

let currentIndex = 0;
let score = 0;

// --- DOM refs ---

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const progressFill = document.getElementById("progress-fill");

// --- Functions ---

function updateScoreDisplay() {
  scoreElement.innerText = score;
}

function updateProgressBar() {
  const percent = (currentIndex / quizData.length) * 100;
  progressFill.style.width = percent + "%";
}

function showQuestion(data) {
  answerButtonsElement.innerHTML = "";
  questionElement.innerText = data.question;
  updateProgressBar();

  data.answers.forEach((text, index) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add("btn");
    button.onclick = () => handleAnswer(index, data.correct);
    answerButtonsElement.appendChild(button);
  });
}

function handleAnswer(selectedIndex, correctIndex) {
  const buttons = answerButtonsElement.querySelectorAll(".btn");

  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === correctIndex) {
    buttons[selectedIndex].classList.add("correct");
    score++;
    updateScoreDisplay();
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < quizData.length) {
      showQuestion(quizData[currentIndex]);
    } else {
      progressFill.style.width = "100%";
      questionElement.innerText = `Quiz complete! You scored ${score} out of ${quizData.length}.`;
      answerButtonsElement.innerHTML = "";
    }
  }, 1000);
}

// --- Init ---

showQuestion(quizData[currentIndex]);