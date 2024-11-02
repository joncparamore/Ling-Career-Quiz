const careers = ["Academia", "Speech Pathology", "TESOL", "Natural Language Processing", "Audiology", 
                 "Law", "Translation", "Technical Writer", "Foreign Language Teaching", "Lexicography"];

const questions = [
    {
        question: "I like to read highly technical books and articles on topics that interest me.",
        answers: { "Strongly Agree: I love exploring the fine details of a topic that interests me.",
      "Agree: I like diving deeply into a topic but get bored if I do it too much.",
      "Neutral: I have no strong feelings toward reading technical books and papers.",
      "Disagree: I try to avoid technical reading but can do it if I have to.",
      "Strongly Disagree: I hate reading highly technical books and papers, regardless of the topic." }
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
