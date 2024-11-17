const questions = [
    { question: "What motivates you the most?", answers: ["Power", "Wealth", "Adventure", "Freedom"] },
    { question: "How do you solve conflicts?", answers: ["Brute Force", "Negotiation", "Trickery", "Avoidance"] },
    { question: "What’s your ideal setting?", answers: ["Open Seas", "Busy Port", "Hidden Island", "Grand City"] },
    { question: "What’s your leadership style?", answers: ["Strict", "Charismatic", "Reckless", "Calculated"] },
    { question: "What do you value most?", answers: ["Loyalty", "Freedom", "Treasure", "Respect"] },
    { question: "How do you handle danger?", answers: ["Face it head-on", "Avoid it", "Strategize", "Dive into it"] },
    { question: "What’s your weapon of choice?", answers: ["Cutlass", "Pistol", "Cannon", "Wit"] },
    { question: "How do you spend your free time?", answers: ["Exploring", "Scheming", "Relaxing", "Practicing skills"] },
    { question: "What kind of crew do you want?", answers: ["Fierce fighters", "Loyal friends", "Smart strategists", "Fearless adventurers"] },
    { question: "What would your pirate ship be named?", answers: ["The Fearless", "The Golden Coin", "The Shadow", "The Storm"] },
    { question: "What’s your view on rules?", answers: ["Break them", "Bend them", "Follow them", "Make your own"] },
    { question: "How do you acquire treasure?", answers: ["Steal it", "Earn it", "Find it", "Negotiate for it"] },
    { question: "What’s your biggest fear?", answers: ["Failure", "Betrayal", "Losing freedom", "Being forgotten"] },
];

const pirates = {
    Power: "Blackbeard",
    Wealth: "Henry Every",
    Adventure: "Anne Bonny",
    Freedom: "Jean Lafitte",
};

let currentQuestion = 0;
let userChoices = [];

const startScreen = document.getElementById("start-screen");
const questionScreen = document.getElementById("question-screen");
const resultScreen = document.getElementById("result-screen");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const answerChoices = document.getElementById("answer-choices");
const resultText = document.getElementById("result");

document.getElementById("start-button").addEventListener("click", () => {
    startScreen.style.display = "none";
    questionScreen.style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.innerText = question.question;
    answerChoices.innerHTML = "";

    question.answers.forEach((answer) => {
        const answerBox = document.createElement("div");
        answerBox.classList.add("answer-box");
        answerBox.innerText = answer;
        answerBox.addEventListener("click", () => {
            userChoices.push(answer);
            nextQuestion();
        });
        answerChoices.appendChild(answerBox);
    });

    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}
function showResult() {
    questionScreen.style.display = "none";
    resultScreen.style.display = "block";

    // Clear any existing "Learn More" link to prevent duplicates
    const existingLink = resultScreen.querySelector('p');
    if (existingLink) {
        existingLink.remove();
    }

    // Determine personality based on most selected answer category
    const match = pirates[userChoices[0]] || "Mystery Pirate";
    
    // Set the pirate name in the "Your Pirate Match" section
    const resultHeader = document.getElementById("result-header");
    resultHeader.innerText = `Your Pirate Match: ${match}`;

    // Create and append the "Learn More" link
    const learnMoreText = document.createElement('p');
    learnMoreText.innerHTML = `Click <a href="https://en.wikipedia.org/wiki/${match.replace(" ", "_")}" target="_blank">here</a> to learn more about ${match}!`;
    resultScreen.appendChild(learnMoreText);
}





document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestion = 0;
    userChoices = [];
    resultScreen.style.display = "none";
    startScreen.style.display = "block";
});
