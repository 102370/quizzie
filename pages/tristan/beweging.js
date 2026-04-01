let correct = 0;
let wrong = 0;
let questionNum = 0;
let showingAnswer = false;
let showingExplanation = false;
let picked = null;

// Shuffle function
function shuffleChoices(choices) {
    const shuffled = [...choices];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const quiz = [
    {
        q: "Hoeveel minuten lichaamsbeweging per week wordt aanbevolen voor volwassenen?",
        img: "../media/city.jpg",
        choices: [
            { ans: "150 minuten matige intensiteit", right: true, explain: "Correct! Dit is de WHO aanbeveling." },
            { ans: "30 minuten", right: false, explain: "Te weinig. De aanbeveling is hoger." },
            { ans: "30 minuten per dag", right: false, explain: "Dit is te beperkt voor optimale gezondheid." },
            { ans: "Geen norm, alleen wanneer je zin hebt", right: false, explain: "Regelmatige beweging is belangrijk voor gezondheid." }
        ]
    },
    {
        q: "Welk type beweging is het beste voor botsterkte?",
        img: "../media/rdam.jpg",
        choices: [
            { ans: "Gewichtdragende oefeningen en krachtraining", right: true, explain: "Juist! Dit versterkt botten het meest." },
            { ans: "Alleen zwemmen", right: false, explain: "Zwemmen is goed maar niet optimaal voor botten." },
            { ans: "Alleen strekken", right: false, explain: "Strekken helpt met flexibiliteit, niet botsterkte." },
            { ans: "Wandelen in de schaduw", right: false, explain: "Wandelen helpt, maar intensievere oefeningen zijn beter." }
        ]
    },
    {
        q: "Wat is het voornaamste voordeel van aerobische training?",
        img: "../media/city.jpg",
        choices: [
            { ans: "Het verbetert hartgezondheid en uithoudingsvermogen", right: true, explain: "Correct! Cardio versterkt je cardiovasculair systeem." },
            { ans: "Het maakt je spierballen groter", right: false, explain: "Dit wordt bereikt door krachtraining, niet cardio." },
            { ans: "Het verhoogt je flexibiliteit", right: false, explain: "Dit is meer een voordeel van yoga en strekken." },
            { ans: "Het helpt alleen om gewicht te verliezen", right: false, explain: "Het helpt ervoor maar heeft veel meer voordelen." }
        ]
    },
    {
        q: "Hoe lang duurt het voordat je gezondheidsvoordelen van beweging ziet?",
        img: "../media/rdam.jpg",
        choices: [
            { ans: "Na 2-4 weken regelmatige beweging", right: true, explain: "Juist! Je voelt al voordelen na enkele weken." },
            { ans: "Na 1 week", right: false, explain: "Dit is te snel voor meetbare veranderingen." },
            { ans: "Na 6 maanden", right: false, explain: "Je ziet voordelen veel eerder dan dit." },
            { ans: "Nooit, tenzij je intensief traint", right: false, explain: "Milde regelmatige beweging geeft ook voordelen." }
        ]
    },
    {
        q: "Welke activiteit is NIET beschouwd als lichaamsbeweging?",
        img: "../media/city.jpg",
        choices: [
            { ans: "Staan en films kijken", right: true, explain: "Correct! Dit is zittend en geen intensieve beweging." },
            { ans: "Dansen", right: false, explain: "Dansen is uitstekende lichaamsbeweging." },
            { ans: "Fietsen naar school", right: false, explain: "Dit is actieve transportbeweging." },
            { ans: "Voetbal spelen", right: false, explain: "Sport is gestructureerde lichaamsbeweging." }
        ]
    },
    {
        q: "Wat is het belang van opwarmings- en afkoelingsduiden?",
        img: "../media/rdam.jpg",
        choices: [
            { ans: "Ze voorkomen plotselinge bloedrukveranderingen", right: true, explain: "Juist! Dit is cruciaal voor veiligheid." },
            { ans: "Ze zijn helemaal niet nodig", right: false, explain: "Ze voorkomen blessures en helpen herstel." },
            { ans: "Ze maken je sterker", right: false, explain: "Ze zijn voorzorgsmaatregel, niet voor sterkte." },
            { ans: "Ze kosten alleen maar tijd", right: false, explain: "Ze zijn essentieel voor veilige training." }
        ]
    },
    {
        q: "Hoeveel water moet je drinken tijdens intensieve beweging?",
        img: "../media/city.jpg",
        choices: [
            { ans: "Regelmatig in kleine porties", right: true, explain: "Correct! Dit voorkomt uitdroging." },
            { ans: "Helemaal niets", right: false, explain: "Hydratatie is cruciaal tijdens beweging." },
            { ans: "Zoveel mogelijk in één keer", right: false, explain: "Regelmatige kleine slokken zijn beter." },
            { ans: "Alleen frisdrank of energiedrankjes", right: false, explain: "Water is het beste voor hydratatie." }
        ]
    },
    {
        q: "Welke lichaamsdelen worden vooral gestrekt bij yoga?",
        img: "../media/rdam.jpg",
        choices: [
            { ans: "Alle spieren en het hele lichaam", right: true, explain: "Juist! Yoga werkt op heel je flexibiliteit." },
            { ans: "Alleen je benen", right: false, explain: "Yoga strekt veel meer lichaamsdelen." },
            { ans: "Alleen je rug", right: false, explain: "Yoga is veel uitgebreider." },
            { ans: "Alleen je armen", right: false, explain: "Dit is veel te beperkt." }
        ]
    },
    {
        q: "Het is ergens te laat voor om beweging te beginnen. Waar of onwaar?",
        img: "../media/city.jpg",
        choices: [
            { ans: "Onwaar, je kunt op elke leeftijd beginnen", right: true, explain: "Correct! Beweging helpt op elke leeftijd." },
            { ans: "Waar, na 40 jaar is het voorbij", right: false, explain: "Bewegen is op elke leeftijd nuttig!" },
            { ans: "Alleen waar voor oudere mensen", right: false, explain: "Iedereen kan baat hebben bij beweging." },
            { ans: "Waar, medische redenen", right: false, explain: "De meeste mensen kunnen veilig bewegen." }
        ]
    },
    {
        q: "Welke voeding helpt het meest bij lichamelijk herstel na training?",
        img: "../media/rdam.jpg",
        choices: [
            { ans: "Eiwitten en koolhydraten samen", right: true, explain: "Juist! Dit helpt spierengroei en energieherstel." },
            { ans: "Alleen suiker", right: false, explain: "Je hebt zowel eiwitten als koolhydraten nodig." },
            { ans: "Alleen vetten", right: false, explain: "Dit is niet optimaal voor herstel." },
            { ans: "Je moet niet eten na training", right: false, explain: "Voeding na training is belangrijk voor herstel." }
        ]
    }
];

const numQuestions = 10;

const qNum = document.getElementById("q-num");
const qText = document.getElementById("q-text");
const choicesDiv = document.getElementById("choices-container");
const btn = document.getElementById("next-btn");
const armor = document.getElementById("armor-bar");
const img = document.getElementById("quiz-image");

function showArmor() {
    armor.innerHTML = "";
    for (let i = 0; i < numQuestions; i++) {
        let piece = document.createElement("span");
        if (i < questionNum) {
            piece.innerHTML = '<img src="Assets/armor-full.png"</img>';
            piece.style.opacity = "1";
        } else if (i === questionNum) {
            piece.innerHTML = '<img src="Assets/armor-half.png"</img>';
            piece.style.opacity = "1";
        } else {
            piece.innerHTML = '<img src="Assets/armor-empty.png"</img>';
            piece.style.opacity = "0.3";
        }
        armor.appendChild(piece);
    }
}

function display() {
    if (questionNum >= quiz.length) {
        qNum.innerText = "✓";
        qText.innerText = `Done! Correct: ${correct}, Wrong: ${wrong}`;
        choicesDiv.innerHTML = "";
        btn.style.display = "none";
        showArmor();
        return;
    }
    
    const current = quiz[questionNum];
    qNum.innerText = questionNum + 1;
    qText.innerText = current.q;

    if (img && current.img) {
        img.src = current.img;
    }

    showingAnswer = false;
    showingExplanation = false;
    picked = null;
    btn.disabled = true;
    btn.innerText = "next";
    
    showArmor();

    choicesDiv.innerHTML = "";
    const shuffledChoices = shuffleChoices(current.choices);
    shuffledChoices.forEach((opt, i) => {
        let choice = document.createElement("div");
        choice.className = "choice";
        choice.innerText = opt.ans;
        
        let explain = document.createElement("div");
        explain.className = "explanation-text";
        explain.innerText = opt.explain;
        choice.appendChild(explain);

        choice.addEventListener("click", () => selectOption(i));
        choicesDiv.appendChild(choice);
        
        if (opt.right) {
            choice.dataset.correct = "true";
        }
        
        // Store the explanation and rightness in data attributes
        choice.dataset.explain = opt.explain;
        choice.dataset.right = opt.right;
    });
}

function selectOption(index) {
    if (showingAnswer) return;

    picked = index;
    let allChoices = document.querySelectorAll(".choice");
    
    allChoices.forEach((choice, i) => {
        if (i === index) {
            choice.classList.add("selected");
        } else {
            choice.classList.remove("selected");
        }
    });

    btn.disabled = false;
}

btn.addEventListener("click", () => {
    if (showingExplanation) {
        // Third click: go to next question
        let expanded = document.querySelector(".choice.expanded");
        if (expanded) {
            expanded.classList.add("collapsing");
            expanded.classList.remove("expanded");
            
            setTimeout(() => {
                let placeholder = document.querySelector(".choice-placeholder");
                if (placeholder) placeholder.remove();
                
                questionNum++;
                display();
                showingAnswer = false;
                showingExplanation = false;
            }, 400); // Wait for the collapse animation
        } else {
            questionNum++;
            display();
            showingAnswer = false;
            showingExplanation = false;
        }
    } else if (showingAnswer) {
        // Second click: expand the selected choice and show explanation
        let allChoices = document.querySelectorAll(".choice");
        let selected = allChoices[picked];
        let userWasCorrect = selected.dataset.right === "true";
        let container = document.querySelector(".choices-container");
        
        // Get precise starting coordinates
        let sRect = selected.getBoundingClientRect();
        let cRect = container.getBoundingClientRect();
        
        // Save the exact start dimensions to CSS variables
        selected.style.setProperty('--start-left', (sRect.left - cRect.left) + 'px');
        selected.style.setProperty('--start-top', (sRect.top - cRect.top) + 'px');
        selected.style.setProperty('--start-width', sRect.width + 'px');
        selected.style.setProperty('--start-height', sRect.height + 'px');
        
        // Add a placeholder so the grid doesn't collapse or shift other items
        let placeholder = document.createElement("div");
        placeholder.className = "choice-placeholder";
        placeholder.style.width = sRect.width + "px";
        placeholder.style.height = sRect.height + "px";
        selected.parentNode.insertBefore(placeholder, selected);
        
        // Expand the selected choice
        selected.classList.add("expanded");
        
        // Show explanation for the selected choice
        let explainText = selected.querySelector(".explanation-text");
        if (explainText) {
            explainText.innerText = selected.dataset.explain;
            explainText.style.display = "block";
        }
        
        showingExplanation = true;
        btn.innerText = "Next Question";
    } else {
        // First click: show correct/wrong colors
        let allChoices = document.querySelectorAll(".choice");
        let selected = allChoices[picked];
        let userWasCorrect = selected.dataset.right === "true";

        // Find the correct answer
        let correctChoice = Array.from(allChoices).find(choice => choice.dataset.correct === "true");

        // Color the correct answer green
        correctChoice.style.backgroundColor = "#4caf50";
        correctChoice.style.color = "white";

        // Color user's answer red if wrong
        if (!userWasCorrect) {
            selected.style.backgroundColor = "#f44336";
            selected.style.color = "white";
        } else {
            // If correct, also make it white text
            selected.style.color = "white";
        }

        if (userWasCorrect) {
            correct++;
        } else {
            wrong++;
        }
        
        showingAnswer = true;
        btn.innerText = "Show Explanation";
    }
});

display();


document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only prevent default for placeholder links
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
            }
            // Remove active class from all, add to this one
            navItems.forEach(ni => ni.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
