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
    // Mental Health Questions
    {
        q: "Wat is een van de belangrijkste voordelen van regelmatig mindfulness beoefenen?",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Verhoogt stress", right: false, explain: "Onjuist. Mindfulness vermindert juist stress." },
            { ans: "Vermindert concentratie", right: false, explain: "Onjuist. Mindfulness verbetert juist concentratie." },
            { ans: "Verbetert emotionele veerkracht", right: true, explain: "Correct! Mindfulness helpt om bewust te worden van gedachten en gevoelens zonder oordeel, wat stress vermindert en emotionele veerkracht versterkt." },
            { ans: "Verhoogt angst", right: false, explain: "Onjuist. Mindfulness vermindert juist angsten." }
        ]
    },
    {
        q: "Welke factor draagt het meest bij aan een positieve mentale gezondheid?",
        img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Alleen zijn zonder contact", right: false, explain: "Onjuist. Sociale contact is juist essentieel voor mentale gezondheid." },
            { ans: "Sociale steun en verbinding", right: true, explain: "Correct! Sociale steun van vrienden, familie of collega's versterkt gevoelens van verbondenheid en vermindert eenzaamheid." },
            { ans: "Negatieve zelfpraat", right: false, explain: "Onjuist. Negatieve zelfpraat schaadt juist de mentale gezondheid." },
            { ans: "Chronisch stressen", right: false, explain: "Onjuist. Chronische stress is schadelijk voor mentale gezondheid." }
        ]
    },
    {
        q: "Waarom is voldoende slaap belangrijk voor mentale gezondheid?",
        img: "https://images.unsplash.com/photo-1534067783941-51c7e75f0df0?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Het heeft geen effect", right: false, explain: "Onjuist. Slaap is essentieel voor mentale gezondheid." },
            { ans: "Het vermindert geheugen en stemming", right: false, explain: "Onjuist. Slaap verbetert juist geheugen en stemming." },
            { ans: "Het ondersteunt geheugen, stemming en herstel van de hersenen", right: true, explain: "Correct! Slaap helpt het brein om informatie te verwerken, emoties te reguleren en het lichaam te herstellen." },
            { ans: "Het veroorzaakt stress", right: false, explain: "Onjuist. Slaapgebrek veroorzaakt juist stress." }
        ]
    },
    {
        q: "Wat is een kenmerk van gezonde stresshantering?",
        img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Emoties onderdrukken", right: false, explain: "Onjuist. Emoties onderdrukken is geen gezonde manier om stress te hanteren." },
            { ans: "Actief copingstrategieën gebruiken, zoals plannen of praten met anderen", right: true, explain: "Correct! Gezonde stresshantering omvat strategieën zoals plannen, praten over problemen en ontspanningsoefeningen." },
            { ans: "Alles vermijden", right: false, explain: "Onjuist. Vermijden verergert stress juist." },
            { ans: "Alleen op medicatie vertrouwen", right: false, explain: "Onjuist. Medicatie kan helpen, maar ook andere strategieën zijn belangrijk." }
        ]
    },
    {
        q: "Welke rol speelt lichaamsbeweging in mentale gezondheid?",
        img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Verhoogt depressie", right: false, explain: "Onjuist. Beweging vermindert juist depressie." },
            { ans: "Vermindert angst en verbetert stemming", right: true, explain: "Correct! Lichaamsbeweging stimuleert de aanmaak van endorfines en vermindert angst." },
            { ans: "Heeft geen effect", right: false, explain: "Onjuist. Beweging heeft grote gevolgen voor mentale gezondheid." },
            { ans: "Alleen nuttig voor spieren", right: false, explain: "Onjuist. Beweging is ook essentieel voor mentale gezondheid." }
        ]
    },
    {
        q: "Wat is een veelvoorkomend symptoom van depressie?",
        img: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Verhoogde energie", right: false, explain: "Onjuist. Depressie gaat juist met vermoeidheid gepaard." },
            { ans: "Aanhoudende sombere stemming en verlies van interesse", right: true, explain: "Correct! Depressie kenmerkt zich door sombere stemming, verlies van interesse en vermoeidheid." },
            { ans: "Overmatige vrolijkheid", right: false, explain: "Onjuist. Dit kan eerder wijzen op andere aandoeningen." },
            { ans: "Verbeterd geheugen", right: false, explain: "Onjuist. Depressie beïnvloedt geheugen juist negatief." }
        ]
    },
    {
        q: "Waarom kan het bijhouden van een dagboek nuttig zijn voor mentale gezondheid?",
        img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Het heeft geen effect", right: false, explain: "Onjuist. Een dagboek kan erg effectief zijn." },
            { ans: "Het helpt gedachten en gevoelens te verwerken en zelfinzicht te vergroten", right: true, explain: "Correct! Schrijven helpt emoties te ordenen en zorgt voor zelfreflectie en stressvermindering." },
            { ans: "Het veroorzaakt stress", right: false, explain: "Onjuist. Het dagboek schrijven vermindert juist stress." },
            { ans: "Het vervangt sociale steun volledig", right: false, explain: "Onjuist. Het aanvult sociale steun, maar vervangt het niet." }
        ]
    },
    {
        q: "Welke van de volgende gewoonten ondersteunt mentale veerkracht het meest?",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Negatieve zelfpraat", right: false, explain: "Onjuist. Dit schaadt veerkracht." },
            { ans: "Regelmatige ontspanning en zelfzorg", right: true, explain: "Correct! Ontspanning en zelfzorg versterken het vermogen om met tegenslagen om te gaan." },
            { ans: "Overwerken zonder pauzes", right: false, explain: "Onjuist. Dit verzwakt veerkracht." },
            { ans: "Sociale isolatie", right: false, explain: "Onjuist. Isolatie schaadt veerkracht." }
        ]
    },
    {
        q: "Hoe kan sociale media invloed hebben op mentale gezondheid?",
        img: "https://images.unsplash.com/photo-1611532736612-b5b83d6c3a41?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Alleen positieve effecten", right: false, explain: "Onjuist. Sociale media hebben ook negatieve effecten." },
            { ans: "Kan zowel positieve als negatieve effecten hebben, afhankelijk van gebruik", right: true, explain: "Correct! Sociale media kunnen steun bieden, maar ook stress en vergelijking verhogen." },
            { ans: "Heeft geen effect", right: false, explain: "Onjuist. Sociale media hebben wel degelijk effecten op mentale gezondheid." },
            { ans: "Altijd negatief", right: false, explain: "Onjuist. Sociale media kunnen ook positieve effecten hebben." }
        ]
    },
    {
        q: "Wat is een belangrijk kenmerk van een gezonde copingstrategie bij stressvolle situaties?",
        img: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=1200&h=800&fit=crop&auto=format&q=80",
        choices: [
            { ans: "Vermijden van problemen", right: false, explain: "Onjuist. Dit maakt problemen juist erger." },
            { ans: "Actieve aanpak, zoals probleemoplossing en emotionele ondersteuning zoeken", right: true, explain: "Correct! Effectieve copingstrategieën omvatten actief problemen aanpakken en hulp zoeken." },
            { ans: "Altijd klagen zonder actie", right: false, explain: "Onjuist. Dit helpt niet." },
            { ans: "Zelfisolatie", right: false, explain: "Onjuist. Dit maakt dingen juist erger." }
        ]
    },
];

const numQuestions = quiz.length;

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
            piece.innerHTML = '<img src="Assets/bubble-full.png" alt="bubble-full" />';
            piece.style.opacity = "1";
        } else if (i === questionNum) {
            piece.innerHTML = '<img src="Assets/bubble-half.png" alt="bubble-half" />';
            piece.style.opacity = "1";
        } else {
            piece.innerHTML = '<img src="Assets/bubble-empty.png" alt="bubble-empty" />';
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

    const choices = choicesDiv.querySelectorAll(".choice");
    const selectedChoice = choices[index];
    const isCorrect = selectedChoice.dataset.correct === "true";

    if (isCorrect) {
        correct++;
        selectedChoice.style.backgroundColor = "#4CAF50";
    } else {
        wrong++;
        selectedChoice.style.backgroundColor = "#F44336";
    }

    selectedChoice.classList.add("selected");
    selectedChoice.classList.add("expanded");
    selectedChoice.style.color = "white";
    showingAnswer = true;
    picked = index;
    btn.disabled = false;
    btn.innerText = "next";
}

btn.addEventListener("click", () => {
    if (!showingAnswer) return;
    questionNum++;
    showingAnswer = false;
    display();
});

// Initial display
display();
