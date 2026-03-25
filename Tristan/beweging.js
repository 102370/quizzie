// VARIABLES FOR LEADERBOARD / TRACKING
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let currentQuestionIndex = 0;

// STATE VARIABLE
let isShowingExplanation = false;
let selectedOptionIndex = null;

// QUIZ DATA PLACEHOLDERS
const questions = [
    {
        questionText: "[Placeholder Question 1: What is healthy movement?]",
        options: [
            { text: "[Option A]", isCorrect: false, explanation: "Wrong because A is incorrect." },
            { text: "[Option B]", isCorrect: true, explanation: "Correct! B is the right way to move." },
            { text: "[Option C]", isCorrect: false, explanation: "Wrong because C is just sitting." },
            { text: "[Option D]", isCorrect: false, explanation: "Wrong. D is harmful." }
        ]
    },
    {
        questionText: "[Placeholder Question 2: How often should you exercise?]",
        options: [
            { text: "[Option A]", isCorrect: false, explanation: "Explanation A" },
            { text: "[Option B]", isCorrect: false, explanation: "Explanation B" },
            { text: "[Option C]", isCorrect: true, explanation: "Correct! Explanation C" },
            { text: "[Option D]", isCorrect: false, explanation: "Explanation D" }
        ]
    }
    // Add more placeholder questions here to reach 10 questions to fill the 10-piece armor bar
];

const totalQuestions = 10; 

// DOM Elements
const qNumEl = document.getElementById("q-num");
const qTextEl = document.getElementById("q-text");
const choicesContainer = document.getElementById("choices-container");
const nextBtn = document.getElementById("next-btn");
const armorBarEl = document.getElementById("armor-bar");

function renderArmorBar() {
    armorBarEl.innerHTML = "";
    // Minecraft armor icon placeholder: 👕 or 🛡️
    for (let i = 0; i < totalQuestions; i++) {
        const armorPiece = document.createElement("span");
        if (i < currentQuestionIndex) {
            armorPiece.innerText = "🛡️"; // Filled armor
            armorPiece.style.opacity = "1";
        } else {
            armorPiece.innerText = "🛡️"; // Empty armor
            armorPiece.style.opacity = "0.3";
        }
        armorBarEl.appendChild(armorPiece);
    }
}

function loadQuestion() {
    // Check if quiz is finished
    if (currentQuestionIndex >= questions.length) {
        showEndOfQuiz();
        return;
    }
    
    const currentQ = questions[currentQuestionIndex];
    qNumEl.innerText = currentQuestionIndex + 1;
    qTextEl.innerText = currentQ.questionText;

    isShowingExplanation = false;
    selectedOptionIndex = null;
    nextBtn.disabled = true;
    nextBtn.innerText = "next";
    
    renderArmorBar();

    // Render options
    choicesContainer.innerHTML = "";
    currentQ.options.forEach((opt, index) => {
        const choiceDiv = document.createElement("div");
        choiceDiv.className = "choice";
        choiceDiv.innerText = opt.text;
        
        // Hidden explanation text element
        const expDiv = document.createElement("div");
        expDiv.className = "explanation-text";
        expDiv.innerText = (opt.isCorrect ? "Correct! " : "Incorrect! ") + opt.explanation;
        choiceDiv.appendChild(expDiv);

        choiceDiv.addEventListener("click", () => handleOptionClick(index));
        choicesContainer.appendChild(choiceDiv);
    });
}

function handleOptionClick(index) {
    if (isShowingExplanation) return; // Prevent clicking during explanation phase

    selectedOptionIndex = index;
    const allChoices = document.querySelectorAll(".choice");
    
    // Highlight selected
    allChoices.forEach((choice, i) => {
        if (i === index) {
            choice.classList.add("selected");
        } else {
            choice.classList.remove("selected");
        }
    });

    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    if (isShowingExplanation) {
        // Step 2: Move to next question, shrink window.
        currentQuestionIndex++;
        loadQuestion();
    } else {
        // Step 1: Expand answer and show explanation
        const allChoices = document.querySelectorAll(".choice");
        const selectedChoice = allChoices[selectedOptionIndex];
        const currentQ = questions[currentQuestionIndex];

        selectedChoice.classList.add("expanded");
        
        // Hide other choices
        allChoices.forEach((choice, i) => {
            if (i !== selectedOptionIndex) {
                choice.style.display = "none";
            }
        });

        // Track score safely
        if (currentQ.options[selectedOptionIndex].isCorrect) {
            correctAnswersCount++;
            selectedChoice.style.backgroundColor = "#4caf50"; // Green for right
        } else {
            wrongAnswersCount++;
            selectedChoice.style.backgroundColor = "#f44336"; // Red for wrong
        }
        
        isShowingExplanation = true;
        nextBtn.innerText = "Next Question";
    }
});

function showEndOfQuiz() {
    qNumEl.innerText = "✓";
    qTextEl.innerText = `Quiz Complete! Right: ${correctAnswersCount}, Wrong: ${wrongAnswersCount}`;
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none";
    renderArmorBar();
}

// Initial Load
loadQuestion();

document.addEventListener('DOMContentLoaded', function() {

    // Add nav item click handler
     const navItems = document.querySelectorAll('.nav-item');
     navItems.forEach(item => {
       item.addEventListener('click', function(e) {
         e.preventDefault();
         navItems.forEach(navItem => navItem.classList.remove('active'));
         this.classList.add('active');
       });
     });
   });
   