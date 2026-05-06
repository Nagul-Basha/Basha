function startApp() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "flex";
}

/* MENU */
function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
}

/* HISTORY SAVE */
function saveHistory(input, output) {
    let history = JSON.parse(localStorage.getItem("translatorHistory")) || [];

    history.unshift({ input, output });

    localStorage.setItem("translatorHistory", JSON.stringify(history));
}

/* SHOW HISTORY */
function showHistory() {
    let historyBox = document.getElementById("historyBox");
    let history = JSON.parse(localStorage.getItem("translatorHistory")) || [];

    historyBox.innerHTML = "<h4>History</h4>";

    history.forEach(item => {
        historyBox.innerHTML += `
        <div class="history-item">
        <b>Input:</b> ${item.input}<br>
        <b>Output:</b> ${item.output}
        </div>`;
    });
}

/* CLEAR */
function clearHistory() {
    localStorage.removeItem("translatorHistory");
    showHistory();
}

/* AUTO TRANSLATE */
let typingTimer;
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inputText").addEventListener("input", () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(translateText, 600);
    });
});

/* SWAP */
function swapLang() {
    let from = document.getElementById("fromLang");
    let to = document.getElementById("toLang");

    let temp = from.value;
    from.value = to.value;
    to.value = temp;

    translateText();
}

/* VOICE */
function startVoice() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = document.getElementById("fromLang").value;

    recognition.onresult = (e) => {
        document.getElementById("inputText").value = e.results[0][0].transcript;
        translateText();
    };

    recognition.start();
}

/* TRANSLATE */
async function translateText() {
    let text = document.getElementById("inputText").value;
    let from = document.getElementById("fromLang").value;
    let to = document.getElementById("toLang").value;

    if (!text.trim()) return;

    try {
        let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

        let res = await fetch(url);
        let data = await res.json();

        let translated = data[0][0][0];

        document.getElementById("outputText").value = translated;

        saveHistory(text, translated);

    } catch {
        document.getElementById("outputText").value = "Error";
    }
}

/* SPEAK */
function speakOutput() {
    let text = document.getElementById("outputText").value;
    if (!text) return;

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = document.getElementById("toLang").value;

    speechSynthesis.speak(speech);
}
