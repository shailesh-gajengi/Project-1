const quotes = [
"Typing is the bridge between thought and action. The faster and more accurately you type, the quicker your ideas take shape and come alive on the screen. Typing speed tests help improve your accuracy and speed.",
"Speed in typing comes with practice, but true skill is measured by precision. Every correct keystroke builds confidence, and every mistake teaches discipline.",
"Your fingers are storytellers, translating the language of your mind into words. Type with focus, type with flow, and let the words race ahead of time."
];

const quoteDisplay = document.getElementById("quote");
const inputField = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");

let timer, timeLeft = 60;
let currentQuote = "";
let started = false;

function renderQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = "";
    currentQuote.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
}

function startTest() {
    renderQuote();
    inputField.value = "";
    inputField.disabled = false;
    inputField.focus();
    submitBtn.disabled = false;
    startBtn.disabled = true;
    started = true;
    timeLeft = 60;
    timerDisplay.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitTest();
        }
    }, 1000);
}

function checkTyping() {
    const typedText = inputField.value.split("");
    const spanArray = quoteDisplay.querySelectorAll("span");

    spanArray.forEach((char, index) => {
        let typedChar = typedText[index];
        if (typedChar == null) {
            char.classList.remove("correct", "incorrect");
        } 
        else if (typedChar === char.innerText) {
            char.classList.add("correct");
            char.classList.remove("incorrect");
        } 
        else {
            char.classList.add("incorrect");
            char.classList.remove("correct");
        }
    });
}

function submitTest() {
    if (!started) return;

    clearInterval(timer);
    inputField.disabled = true;
    submitBtn.disabled = true;
    startBtn.disabled = false;

    const typed = inputField.value.trim();
    const correctChars = quoteDisplay.querySelectorAll(".correct").length;
    const totalChars = currentQuote.length;
    const mistakes = quoteDisplay.querySelectorAll(".incorrect").length;

    const wordsTyped = typed.split(" ").filter(w => w).length;
    const wpm = Math.round((wordsTyped / (60 - timeLeft)) * 60);
    const accuracy = Math.round((correctChars / totalChars) * 100);

    resultDisplay.innerHTML = `
        <p><strong>WPM:</strong> ${isNaN(wpm) ? 0 : wpm}</p>
        <p><strong>Accuracy:</strong> ${accuracy}%</p>
        <p><strong>Mistakes:</strong> ${mistakes}</p>
    `;
}

inputField.addEventListener("input", checkTyping);
startBtn.addEventListener("click", startTest);
submitBtn.addEventListener("click", submitTest);
