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
const answered     = new Array(quizData.length).fill(null); // null | true | false
const answeredPick = new Array(quizData.length).fill(null); // picked index per question

// --- DOM refs (stable — never replaced) ---

const questionElement = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const scoreElement    = document.getElementById("score");
const progressFill    = document.getElementById("progress-fill");
const questionNumber  = document.getElementById("question-number");
const prevBtn         = document.getElementById("prev-btn");
const nextBtn         = document.getElementById("next-btn");
const quizBody        = document.getElementById("quiz-body");    // wraps question + answers + nav
const resultScreen    = document.getElementById("result-screen");
const resultEmoji     = document.getElementById("result-emoji");
const resultTitle     = document.getElementById("result-title");
const resultMsg       = document.getElementById("result-msg");

// --- Helpers ---

function updateScoreDisplay() {
  scoreElement.innerText = score;
}

function updateProgressBar() {
  const answeredCount = answered.filter(a => a !== null).length;
  progressFill.style.width = (answeredCount / quizData.length * 100) + "%";
}

function updateNavButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === quizData.length - 1;
}

// --- Render question ---

function showQuestion(data) {
  answerButtonsEl.innerHTML = "";
  questionElement.innerText = data.question;
  questionNumber.innerText  = `Question ${currentIndex + 1} of ${quizData.length}`;

  updateProgressBar();
  updateNavButtons();

  data.answers.forEach((text, index) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add("btn");

    if (answered[currentIndex] !== null) {
      // Already answered — restore visual state, no click handler
      button.disabled = true;
      if (index === data.correct)             button.classList.add("correct");
      else if (index === answeredPick[currentIndex]) button.classList.add("wrong");
    } else {
      button.onclick = () => handleAnswer(index, data.correct);
    }

    answerButtonsEl.appendChild(button);
  });
}

// --- Handle answer pick ---

function handleAnswer(selectedIndex, correctIndex) {
  const buttons = answerButtonsEl.querySelectorAll(".btn");
  buttons.forEach(btn => btn.disabled = true);

  answeredPick[currentIndex] = selectedIndex;

  if (selectedIndex === correctIndex) {
    buttons[selectedIndex].classList.add("correct");
    answered[currentIndex] = true;
    score++;
    updateScoreDisplay();
  } else {
    buttons[selectedIndex].classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
    answered[currentIndex] = false;
  }

  updateProgressBar();
  updateNavButtons();

  const allDone = answered.every(a => a !== null);
  if (allDone) {
    setTimeout(showResult, 900);
  } else if (currentIndex < quizData.length - 1) {
    setTimeout(() => navigate(1), 900);
  }
}

// --- Navigation ---

function navigate(direction) {
  const next = currentIndex + direction;
  if (next < 0 || next >= quizData.length) return;
  currentIndex = next;
  showQuestion(quizData[currentIndex]);
}

// --- Result screen ---

function showResult() {
  quizBody.style.display    = "none";
  resultScreen.style.display = "block";

  const emoji = score === quizData.length ? "🏆" : score >= quizData.length / 2 ? "👏" : "📚";
  const title = score === quizData.length ? "Perfect score!" : score >= quizData.length / 2 ? "Good job!" : "Keep practising!";

  resultEmoji.innerText = emoji;
  resultTitle.innerText = title;
  resultMsg.innerHTML   = `You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong> correctly.`;
}

function restartQuiz() {
  currentIndex = 0;
  score = 0;
  answered.fill(null);
  answeredPick.fill(null);

  scoreElement.innerText = "0";
  progressFill.style.width = "0%";

  quizBody.style.display     = "";
  resultScreen.style.display = "none";

  showQuestion(quizData[0]);
}

// --- Init ---

showQuestion(quizData[currentIndex]);