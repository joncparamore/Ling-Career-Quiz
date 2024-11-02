const careers = ["Academia", "Speech Pathology", "TESOL", "Natural Language Processing", "Audiology", 
                 "Law", "Translation", "Technical Writer", "Foreign Language Teaching", "Lexicography"];

const questions = [
    {
        question: "Do you enjoy programming and working with languages?",
        answers: { "Yes": "Natural Language Processing", "No": "Other" }
    },
    {
        question: "Do you like helping others improve their speech?",
        answers: { "Yes": "Speech Pathology", "No": "Other" }
    },
    // Add more questions following this format
];

const quizContainer = document.getElementById("quiz");

function buildQuiz() {
    const output = [];

    questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (let answer in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[answer]}">
                    ${answer}
                </label>`
            );
        }
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>`
        );
    });

    quizContainer.innerHTML = output.join("");
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");
    const careerScores = {};

    questions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer) {
            careerScores[userAnswer] = (careerScores[userAnswer] || 0) + 1;
        }
    });

    let topCareer = "";
    let maxScore = 0;
    for (let career in careerScores) {
        if (careerScores[career] > maxScore) {
            maxScore = careerScores[career];
            topCareer = career;
        }
    }

    document.getElementById("results").innerHTML = `Your recommended career is: ${topCareer}`;
}

buildQuiz();
