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
        q: "Hoeveel minuten matige intensiteit lichaamsbeweging per week wordt aanbevolen voor volwassenen?",
        img: "assets/photo1.avif",
        choices: [
            { ans: "150 minuten", right: true, explain: "Correct! Dit is de WHO-aanbeveling voor gezondheid." },
            { ans: "60 minuten", right: false, explain: "Te weinig. De aanbeveling is hoger voor optimale gezondheid." },
            { ans: "300 minuten", right: false, explain: "Dit is voor intensieve training, niet matige intensiteit." },
            { ans: "30 minuten", right: false, explain: "Dit is veel te laag voor de aanbevolen hoeveelheid." }
        ]
    },
    {
        q: "Welk type training is het beste voor botdichtheid en osteoporose preventie?",
        img: "assets/photo2.jpeg",
        choices: [
            { ans: "Gewichtdragende oefeningen en krachtraining", right: true, explain: "Juist! Dit stimuleert botvorming en versterkt botten." },
            { ans: "Zwemmen en wateraerobics", right: false, explain: "Water vermindert gewichtbelasting op botten." },
            { ans: "Alleen stretching en yoga", right: false, explain: "Dit helpt flexibiliteit maar niet botsterkte." },
            { ans: "Cyclische cardio zonder gewicht", right: false, explain: "Gewichtdragende oefeningen zijn cruciaal voor botten." }
        ]
    },
    {
        q: "Wat is VO2 max en waarom is het belangrijk?",
        img: "assets/photo3.avif",
        choices: [
            { ans: "De maximale hoeveelheid zuurstof die je lichaam kan gebruiken", right: true, explain: "Correct! VO2 max is een indicator van cardiovasculaire fitness." },
            { ans: "De hoeveelheid vetten die je verbrandt", right: false, explain: "Dit meet energieverbruik, niet zuurstofopname." },
            { ans: "Je spierkracht index", right: false, explain: "VO2 max meet zuurstofgebruik, niet spierkracht." },
            { ans: "De hartslagfrequentie in rust", right: false, explain: "Dit is iets anders dan VO2 max." }
        ]
    },
    {
        q: "Wat zijn de effecten van interval training (HIIT)?",
        img: "assets/photo4.webp",
        choices: [
            { ans: "Verhoogde stofwisseling en cardiovasculaire verbetering in korte tijd", right: true, explain: "Juist! HIIT is zeer effectief voor fitness en vetverbranding." },
            { ans: "Alleen gewichtsverlies zonder trainingwinsten", right: false, explain: "HIIT geeft veel meer voordelen dan alleen gewichtsverlies." },
            { ans: "Verhoogd blessurerisico zonder voordelen", right: false, explain: "HIIT is veilig en effectief als goed uitgevoerd." },
            { ans: "Alleen spierpijn zonder echte resultaten", right: false, explain: "HIIT geeft aanzienlijke fysieke verbeteringen." }
        ]
    },
    {
        q: "Hoeveel slaap is nodig voor goed musculair herstel na intensieve training?",
        img: "assets/photo5.jpg",
        choices: [
            { ans: "7-9 uur per nacht", right: true, explain: "Correct! Dit is essentieel voor optimaal herstel en anabolisme." },
            { ans: "4-5 uur", right: false, explain: "Te weinig voor goed musculair herstel." },
            { ans: "10+ uur", right: false, explain: "Dit kan overmatig zijn en contraproductief." },
            { ans: "Slaap is niet belangrijk voor herstel", right: false, explain: "Slaap is cruciaal voor spieraanpassing." }
        ]
    },
    {
        q: "Wat is het juiste moment voor proteïneinname na training?",
        img: "../media/photo6.jpeg",
        choices: [
            { ans: "Binnen 1-2 uur na training (anabolic window)", right: true, explain: "Juist! Dit optimalisert spieraanpassing en groei." },
            { ans: "Pas de volgende dag", right: false, explain: "Dit is te laat voor optimaal herstel." },
            { ans: "Het maakt niet uit wanneer", right: false, explain: "Timing is belangrijk voor maximale resultaten." },
            { ans: "4+ uur na training", right: false, explain: "Dit is voorbij het optimale hersteltijdvenster." }
        ]
    },
    {
        q: "Welke lichaamsdelen trainen in een 'push-pull-legs' split?",
        img: "assets/photo7.jpg",
        choices: [
            { ans: "Borst, rug en benen op verschillende dagen", right: true, explain: "Correct! Dit is een populaire bodybuilding split routine." },
            { ans: "Alleen de hele lichaam op één dag", right: false, explain: "Dat is een full-body routine, niet push-pull-legs." },
            { ans: "Alleen armen en schouders", right: false, explain: "Push-pull-legs is veel uitgebreider." },
            { ans: "Alleen cardio en kerntraining", right: false, explain: "Dit is geen push-pull-legs split." }
        ]
    },
    {
        q: "Wat is hypertrófie en hoe bereik je die?",
        img: ".assets/photo8.jpeg",
        choices: [
            { ans: "Spiergroei door 8-12 herhalingen met matige gewichten", right: true, explain: "Juist! Dit is het optimale bereik voor spieraanpassing." },
            { ans: "Het verliezen van vetmassa", right: false, explain: "Dat is cutting, niet hypertrofie." },
            { ans: "Alleen hoge gewichten en lage herhalingen", right: false, explain: "Dit geeft krachtraining, minder hypertrofie." },
            { ans: "Alleen cardio trainen", right: false, explain: "Gewichtstraining is nodig voor hypertrofie." }
        ]
    },
    {
        q: "Wat is het verschil tussen isotonische en isometrische oefeningen?",
        img: "assets/photo9.jpg",
        choices: [
            { ans: "Isotonisch = beweging, Isometrisch = stilstand", right: true, explain: "Correct! Isotonisch heeft beweging, isometrisch niet." },
            { ans: "Ze zijn hetzelfde", right: false, explain: "Dit zijn twee verschillende trainingsmethodes." },
            { ans: "Isotonisch is alleen cardio", right: false, explain: "Isotonisch omvat alle bewegingsrepetities." },
            { ans: "Isometrisch is beter dan isotonisch", right: false, explain: "Beide hebben verschillende voordelen." }
        ]
    },
    {
        q: "Wat is RPE (Rate of Perceived Exertion) en waarom gebruiken atleten het?",
        img: "assets/photo10.webp",
        choices: [
            { ans: "Een schaal van 1-10 om trainingintensiteit te meten", right: true, explain: "Juist! RPE helpt trainingintensiteit objectief bepalen." },
            { ans: "Een naam voor hartslag monitoring", right: false, explain: "RPE is afzonderlijk van hartslagmeting." },
            { ans: "Een type voedingssupplement", right: false, explain: "RPE is een trainingsmeetschaal." },
            { ans: "Een warming-up techniek", right: false, explain: "RPE is voor intensiteitsmeting, niet opwarming." }
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