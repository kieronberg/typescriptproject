const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

const sampleData = {
    question: "Which language is used for web styling?",
    answers: ["HTML", "CSS", "Python", "Java"]
};

function showQuestion(data) {
    questionElement.innerText = data.question;
    data.answers.forEach(text => {
        const button = document.createElement('button');
        button.innerText = text;
        button.classList.add('btn');
        button.onclick = () => alert(`You picked ${text}!`);
        answerButtonsElement.appendChild(button);
    });
}

showQuestion(sampleData);
