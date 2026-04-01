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
        q: "Hoeveel gram vezels per dag wordt vaak aanbevolen voor volwassenen?",
        img: "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg?quality=90&resize=440,400",
        choices: [
            { ans: "Ongeveer 30–40 gram", right: true, explain: "Correct! Voor veel volwassenen wordt rond de 30–40 g vezels per dag aanbevolen." },
            { ans: "Ongeveer 5 gram", right: false, explain: "Te weinig. De aanbevolen hoeveelheid ligt meestal veel hoger." },
            { ans: "Ongeveer 10 gram", right: false, explain: "Te laag. Voor een goede darmgezondheid is doorgaans meer nodig." },
            { ans: "Meer dan 100 gram", right: false, explain: "Dat is voor de meeste mensen onrealistisch hoog." }
        ]
    },
    {
        q: "Welke combinatie is het beste om spierherstel na training te ondersteunen?",
        img: "https://i.ytimg.com/vi/L0UzcuWoTl4/hqdefault.jpg",
        choices: [
            { ans: "Eiwitten + koolhydraten", right: true, explain: "Juist! Eiwitten ondersteunen spierherstel en koolhydraten vullen glycogeen aan." },
            { ans: "Alleen vetten", right: false, explain: "Vetten zijn belangrijk, maar alleen vetten is niet ideaal voor herstel." },
            { ans: "Alleen water", right: false, explain: "Hydratatie is belangrijk, maar je hebt ook voedingsstoffen nodig." },
            { ans: "Alleen suiker", right: false, explain: "Koolhydraten kunnen helpen, maar zonder eiwitten mis je bouwstoffen." }
        ]
    },
    {
        q: "Welke keuze is meestal het beste voorbeeld van een volkoren product?",
        img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVsaWNpb3VzJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D",
        choices: [
            { ans: "Volkorenbrood", right: true, explain: "Correct! Volkoren producten bevatten de hele graankorrel en vaak meer vezels." },
            { ans: "Wit brood", right: false, explain: "Wit brood is geraffineerd en bevat meestal minder vezels." },
            { ans: "Croissant", right: false, explain: "Croissants zijn meestal gemaakt van witte bloem en bevatten veel verzadigd vet." },
            { ans: "Suikerwafel", right: false, explain: "Dit is vooral een zoete snack en geen volkorenproduct." }
        ]
    },
    {
        q: "Welke drank is doorgaans de beste basiskeuze voor dagelijkse hydratatie?",
        img: "https://i.ytimg.com/vi/cAgsmgXWZr4/hqdefault.jpg",
        choices: [
            { ans: "Water", right: true, explain: "Juist! Water is de beste basisdrank: geen suiker en geen calorieën." },
            { ans: "Energiedrank", right: false, explain: "Bevat vaak veel suiker en cafeïne; niet ideaal als basisdrank." },
            { ans: "Frisdrank", right: false, explain: "Bevat meestal veel suiker (of zoetstoffen) en is geen beste basiskeuze." },
            { ans: "Alcohol", right: false, explain: "Alcohol kan uitdroging bevorderen en is geen geschikte hydratatiebron." }
        ]
    },
    {
        q: "Welke optie bevat meestal relatief veel toegevoegde suikers?",
        img: "https://i.ytimg.com/vi/0jmLSpCiBsA/maxresdefault.jpg",
        choices: [
            { ans: "Gezoete ontbijtgranen", right: true, explain: "Correct! Veel ontbijtgranen bevatten verrassend veel toegevoegde suikers." },
            { ans: "Ongezoete havermout", right: false, explain: "Ongezoete havermout bevat van zichzelf weinig suiker." },
            { ans: "Groenten", right: false, explain: "Groenten bevatten nauwelijks toegevoegde suikers." },
            { ans: "Ongezouten noten", right: false, explain: "Noten bevatten vooral vetten en eiwitten, geen toegevoegde suikers." }
        ]
    },
    {
        q: "Welk type vet wordt meestal gezien als een gezondere keuze?",
        img: "https://i.ytimg.com/vi/So6UJfynr0Q/maxresdefault.jpg",
        choices: [
            { ans: "Onverzadigde vetten (bijv. olijfolie, noten)", right: true, explain: "Juist! Onverzadigde vetten zijn vaak een betere keuze voor hartgezondheid." },
            { ans: "Transvetten", right: false, explain: "Transvetten zijn juist ongunstig voor de gezondheid." },
            { ans: "Altijd zoveel mogelijk verzadigd vet", right: false, explain: "Te veel verzadigd vet is meestal geen goede keuze." },
            { ans: "Vet is altijd slecht", right: false, explain: "Vetten zijn essentieel; het gaat om type en hoeveelheid." }
        ]
    },
    {
        q: "Welke snack is meestal het meest voedzaam (met vezels en micronutriënten)?",
        img: "https://i.ytimg.com/vi/ke7eS7ykwyk/maxresdefault.jpg",
        choices: [
            { ans: "Een stuk fruit met een handje noten", right: true, explain: "Correct! Fruit levert vezels/vitamines, noten leveren gezonde vetten en eiwitten." },
            { ans: "Snoep", right: false, explain: "Snoep levert vooral suiker en weinig voedingsstoffen." },
            { ans: "Chips", right: false, explain: "Chips leveren vaak veel zout/vet en weinig vezels." },
            { ans: "Koek", right: false, explain: "Koek bevat vaak veel suiker en verzadigd vet." }
        ]
    },
    {
        q: "Wat is meestal het belangrijkste voordeel van voldoende eiwitinname?",
        img: "https://i.ytimg.com/vi/zLkg89veIrA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD50zI7yQC130SgW2KpPw_ndIBdSw",
        choices: [
            { ans: "Ondersteuning van spieropbouw en herstel", right: true, explain: "Juist! Eiwitten zijn bouwstoffen voor o.a. spieren." },
            { ans: "Het vervangt groente en fruit", right: false, explain: "Nee, je hebt ook vezels, vitaminen en mineralen nodig." },
            { ans: "Je hebt nooit meer koolhydraten nodig", right: false, explain: "Koolhydraten kunnen ook belangrijk zijn, o.a. voor energie." },
            { ans: "Het maakt automatisch afvallen zonder balans", right: false, explain: "Eiwitten kunnen helpen met verzadiging, maar energiebalans blijft belangrijk." }
        ]
    },
    {
        q: "Welke uitspraak over groenten is het meest correct?",
        img: "https://i.ytimg.com/vi/_jDqMP7gwtg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBF8u7g4imA0_4YPpDPxv8AwXMqhA",
        choices: [
            { ans: "Meer groenten eten helpt met vezels, vitamines en verzadiging", right: true, explain: "Correct! Groenten leveren veel micronutriënten en vezels." },
            { ans: "Groenten zijn alleen nuttig als je wilt afvallen", right: false, explain: "Groenten zijn voor iedereen belangrijk, niet alleen bij afvallen." },
            { ans: "Je hebt groenten niet nodig als je supplementen neemt", right: false, explain: "Supplementen vervangen niet de totale voordelen van groenten." },
            { ans: "Groenten bevatten geen voedingsstoffen", right: false, explain: "Integendeel: groenten zijn juist erg voedzaam." }
        ]
    },
    {
        q: "Wat is vaak een praktische tip om gezondere keuzes makkelijker te maken?",
        img: "https://mir-s3-cdn-cf.behance.net/projects/404/63b44f210565923.Y3JvcCwxMzgwLDEwODAsMjgzLDA.png",
        choices: [
            { ans: "Plan maaltijden en zorg voor gezonde snacks in huis", right: true, explain: "Juist! Voorbereiding verlaagt de kans op impulskeuzes." },
            { ans: "Sla ontbijt altijd over", right: false, explain: "Dit werkt niet voor iedereen en is geen algemene gezonde regel." },
            { ans: "Eet alleen 'detox' producten", right: false, explain: "Je lichaam heeft al eigen ontgiftingssystemen; balans is belangrijker." },
            { ans: "Schrap alle koolhydraten voor altijd", right: false, explain: "Koolhydraten kunnen prima passen in een gebalanceerd eetpatroon." }
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