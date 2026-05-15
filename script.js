let stream = null;

// =========================
// TYPEWRITER
// =========================
function typeWriter(element, text, speed = 70, callback) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }

    typing();
}

// =========================
// PAGE LOAD
// =========================
document.addEventListener("DOMContentLoaded", () => {

    const welcomeTitle = document.querySelector(".welcome-box h1");
    const mainTitle = document.querySelector(".card h2");

    if (welcomeTitle) {
        typeWriter(welcomeTitle, welcomeTitle.innerText, 60);
    }

    if (mainTitle) {
        setTimeout(() => {
            typeWriter(mainTitle, mainTitle.innerText, 50);
        }, 800);
    }

    // AUTO TRANSLATE
    const input = document.getElementById("inputText");

    if (input) {
        let timer;

        input.addEventListener("input", () => {
            autoResize(input);

            clearTimeout(timer);
            timer = setTimeout(() => {
                translateText(false);
            }, 600);
        });
    }

});

// =========================
// START APP
// =========================
function startApp() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("mainApp").style.display = "flex";
}

// =========================
// MENU
// =========================
function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

// =========================
// AUTO RESIZE
// =========================
function autoResize(el) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
}

// =========================
// SWAP LANGUAGE
// =========================
function swapLang() {
    const from = document.getElementById("fromLang");
    const to = document.getElementById("toLang");

    [from.value, to.value] = [to.value, from.value];

    translateText(false);
}

// =========================
// VOICE INPUT
// =========================
function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice not supported");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = document.getElementById("fromLang").value;

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;

        document.getElementById("inputText").value = text;
        autoResize(document.getElementById("inputText"));

        translateText(true);
    };

    recognition.start();
}

// =========================
// TRANSLATE
// =========================
async function translateText(autoSpeak = false) {

    const text = document.getElementById("inputText").value.trim();
    const from = document.getElementById("fromLang").value;
    const to = document.getElementById("toLang").value;
    const output = document.getElementById("outputText");

    if (!text) {
        output.value = "";
        return;
    }

    output.value = "Translating...";

    try {
        const url =
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

        const res = await fetch(url);
        const data = await res.json();

        const translated = data[0].map(item => item[0]).join("");

        output.value = translated;

        autoResize(output);

        saveHistory(text, translated);

        if (autoSpeak) {
            speakOutput();
        }

    } catch (err) {
        output.value = "Translation Error";
    }
}

// =========================
// SPEAK OUTPUT (ONLY BUTTON)
// =========================
function speakOutput() {
    const text = document.getElementById("outputText").value;

    if (!text || text === "Translating...") return;

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = document.getElementById("toLang").value;

    speech.rate = 1;
    speech.pitch = 1;

    speechSynthesis.speak(speech);
}

// =========================
// HISTORY
// =========================
function saveHistory(input, output) {
    let history = JSON.parse(localStorage.getItem("translatorHistory")) || [];

    history.unshift({ input, output });

    if (history.length > 20) history.pop();

    localStorage.setItem("translatorHistory", JSON.stringify(history));
}

// =========================
// CAMERA OPEN (FIXED FOR GITHUB PAGES)
// =========================
async function openCamera() {

    const modal = document.getElementById("cameraModal");
    const video = document.getElementById("camera");
    const status = document.getElementById("scanStatus");

    try {

        modal.style.display = "flex";
        status.innerText = "Opening camera...";

        if (stream) {
            stream.getTracks().forEach(t => t.stop());
        }

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: "environment" }
            },
            audio: false
        });

        video.srcObject = stream;

        video.setAttribute("playsinline", true);
        video.setAttribute("autoplay", true);

        await video.play();

        await new Promise(resolve => {
            video.onloadedmetadata = () => resolve();
        });

        status.innerText = "Camera ready. Click 'Click Me' to scan.";

    } catch (err) {
        console.log(err);
        status.innerText = "Camera permission denied";
    }
}

// =========================
// CLOSE CAMERA
// =========================
function closeCamera() {

    const modal = document.getElementById("cameraModal");

    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
    }

    modal.style.display = "none";
}

// =========================
// CAPTURE + OCR (FIXED CLICK ME BUTTON)
// =========================
async function captureImage() {

    const video = document.getElementById("camera");
    const canvas = document.getElementById("captureCanvas");
    const status = document.getElementById("scanStatus");
    const scanBtn = document.getElementById("scanBtn");

    try {

        scanBtn.disabled = true;
        status.innerText = "Capturing image...";

        // WAIT FOR VIDEO READY (IMPORTANT FIX)
        if (video.readyState < 2) {
            await new Promise(resolve => {
                video.onloadeddata = () => resolve();
            });
        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        status.innerText = "Reading text...";

        const result = await Tesseract.recognize(canvas, "eng");

        const text = result.data.text.trim();

        if (!text) {
            status.innerText = "No text found";
            scanBtn.disabled = false;
            return;
        }

        document.getElementById("inputText").value = text;
        autoResize(document.getElementById("inputText"));

        status.innerText = "Text detected";

        await translateText(true);

        status.innerText = "Done";

        setTimeout(() => closeCamera(), 1200);

    } catch (err) {
        console.log(err);
        status.innerText = "OCR failed";
    }

    scanBtn.disabled = false;
}

// =========================
// FILE LOAD
// =========================
function loadFile(event) {

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {

        document.getElementById("inputText").value = e.target.result;

        autoResize(document.getElementById("inputText"));

        translateText(false);
    };

    reader.readAsText(file);
}

// =========================
// FILE MENU
// =========================
function toggleFileMenu() {
    const popup = document.getElementById("filePopup");
    popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}

// =========================
// MENU HISTORY
// =========================
function showHistory() {

    const box = document.getElementById("historyBox");
    const history = JSON.parse(localStorage.getItem("translatorHistory")) || [];

    box.innerHTML = "<h4>History</h4>";

    if (!history.length) {
        box.innerHTML += "<p>No history</p>";
        return;
    }

    history.forEach(h => {
        box.innerHTML += `
        <div class="history-item">
            <b>In:</b> ${h.input}<br>
            <b>Out:</b> ${h.output}
        </div>`;
    });
}

function clearHistory() {
    localStorage.removeItem("translatorHistory");
    showHistory();
}
