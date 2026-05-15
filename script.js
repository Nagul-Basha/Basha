let stream;

// =========================
// TYPEWRITER
// =========================
function typeWriter(element, text, speed = 80, callback) {

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

    const welcomeTitle =
        document.querySelector(".welcome-box h1");

    const mainTitle =
        document.querySelector(".card h2");

    if (welcomeTitle) {

        typeWriter(
            welcomeTitle,
            welcomeTitle.innerText,
            70
        );

    }

    if (mainTitle) {

        setTimeout(() => {

            typeWriter(
                mainTitle,
                mainTitle.innerText,
                60
            );

        }, 1200);

    }

    // AUTO TRANSLATE
    const input =
        document.getElementById("inputText");

    if (input) {

        let timer;

        input.addEventListener("input", () => {

            autoResize(input);

            clearTimeout(timer);

            timer = setTimeout(() => {

                translateText();

            }, 600);

        });

    }

    // LOAD THEME
    if (localStorage.getItem("theme") === "dark") {

        document.body.classList.add("dark");

    }

});

// =========================
// START APP
// =========================
function startApp() {

    document.getElementById("welcomeScreen")
        .style.display = "none";

    document.getElementById("mainApp")
        .style.display = "flex";

}

// =========================
// MENU
// =========================
function toggleMenu() {

    const menu =
        document.getElementById("sideMenu");

    const overlay =
        document.getElementById("overlay");

    menu.classList.toggle("active");

    overlay.classList.toggle("active");

}

// =========================
// DARK MODE
// =========================
function toggleTheme() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

}

// =========================
// HISTORY
// =========================
function saveHistory(input, output) {

    let history =
        JSON.parse(
            localStorage.getItem("translatorHistory")
        ) || [];

    history.unshift({ input, output });

    if (history.length > 20) {

        history.pop();

    }

    localStorage.setItem(
        "translatorHistory",
        JSON.stringify(history)
    );

}

function showHistory() {

    let historyBox =
        document.getElementById("historyBox");

    let history =
        JSON.parse(
            localStorage.getItem("translatorHistory")
        ) || [];

    historyBox.innerHTML = "<h4>History</h4>";

    if (history.length === 0) {

        historyBox.innerHTML +=
            "<p>No history yet</p>";

        return;

    }

    history.forEach(item => {

        historyBox.innerHTML += `
        <div class="history-item">
            <b>Input:</b> ${item.input}<br>
            <b>Output:</b> ${item.output}
        </div>
        `;

    });

}

function clearHistory() {

    localStorage.removeItem("translatorHistory");

    showHistory();

}

// =========================
// AUTO RESIZE
// =========================
function autoResize(el) {

    el.style.height = "auto";

    el.style.height =
        el.scrollHeight + "px";

}

// =========================
// SWAP LANGUAGE
// =========================
function swapLang() {

    let from =
        document.getElementById("fromLang");

    let to =
        document.getElementById("toLang");

    [from.value, to.value] =
        [to.value, from.value];

    translateText();

}

// =========================
// LANGUAGE MAP
// =========================
const speechLangMap = {

    en: "en-US",
    hi: "hi-IN",
    te: "te-IN",
    ta: "ta-IN",
    kn: "kn-IN",
    ml: "ml-IN"

};

// =========================
// VOICE INPUT
// =========================
function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Voice recognition not supported"
        );

        return;

    }

    let recognition =
        new SpeechRecognition();

    recognition.lang =
        speechLangMap[
            document.getElementById("fromLang").value
        ];

    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onresult = (e) => {

        const text =
            e.results[0][0].transcript;

        document.getElementById("inputText")
            .value = text;

        autoResize(
            document.getElementById("inputText")
        );

        translateText();

    };

    recognition.onerror = () => {

        alert("Voice recognition error");

    };

    recognition.start();

}

// =========================
// TRANSLATE
// =========================
async function translateText(autoSpeak = true) {

    let text =
        document.getElementById("inputText").value;

    let from =
        document.getElementById("fromLang").value;

    let to =
        document.getElementById("toLang").value;

    const output =
        document.getElementById("outputText");

    if (!text.trim()) {

        output.value = "";

        return;

    }

    output.value = "Translating...";

    try {

        let url =
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;

        let res = await fetch(url);

        let data = await res.json();

        let translated =
            data[0]
            .map(item => item[0])
            .join("");

        output.value = translated;

        autoResize(output);

        saveHistory(text, translated);

        // AUTO SPEAK
        if (autoSpeak) {

            speakOutput();

        }

    } catch (err) {

        console.log(err);

        output.value =
            "Translation Error";

    }

}

// =========================
// SPEAK OUTPUT
// =========================
function speakOutput() {

    let text =
        document.getElementById("outputText").value;

    if (!text.trim()) return;

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    const lang =
        document.getElementById("toLang").value;

    speech.lang =
        speechLangMap[lang] || "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);

}

// =========================
// OPEN CAMERA
// =========================
async function openCamera() {

    const modal =
        document.getElementById("cameraModal");

    const video =
        document.getElementById("camera");

    const status =
        document.getElementById("scanStatus");

    try {

        status.innerHTML =
            "Opening camera...";

        modal.style.display = "flex";

        stream =
            await navigator.mediaDevices.getUserMedia({

                video: {
                    facingMode: {
                        ideal: "environment"
                    },
                    width: {
                        ideal: 1920
                    },
                    height: {
                        ideal: 1080
                    }
                },

                audio: false

            });

        video.srcObject = stream;

        await video.play();

        status.innerHTML =
            "✅ Camera ready. Click 'Click Me' button.";

    } catch (err) {

        console.log(err);

        status.innerHTML =
            "❌ Camera permission denied";

        alert(
            "Please allow camera permission"
        );

    }

}

// =========================
// CLOSE CAMERA
// =========================
function closeCamera() {

    const modal =
        document.getElementById("cameraModal");

    if (stream) {

        stream.getTracks().forEach(track => {

            track.stop();

        });

    }

    modal.style.display = "none";

}

// =========================
// CAPTURE IMAGE
// =========================
async function captureImage() {

    const video =
        document.getElementById("camera");

    const canvas =
        document.getElementById("captureCanvas");

    const status =
        document.getElementById("scanStatus");

    const scanBtn =
        document.getElementById("scanBtn");

    scanBtn.disabled = true;

    status.innerHTML =
        "📸 Capturing image...";

    try {

        canvas.width =
            video.videoWidth;

        canvas.height =
            video.videoHeight;

        const ctx =
            canvas.getContext("2d");

        // BETTER IMAGE QUALITY
        ctx.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        status.innerHTML =
            "🔍 Scanning text...";

        // OCR
        const result =
            await Tesseract.recognize(
                canvas,
                "eng+hin+tel",
                {
                    logger: m => {

                        if (m.status) {

                            status.innerHTML =
                                `🔍 ${m.status}`;

                        }

                    }
                }
            );

        const text =
            result.data.text.trim();

        if (!text) {

            status.innerHTML =
                "❌ No text detected";

            scanBtn.disabled = false;

            return;

        }

        // PUT TEXT
        document.getElementById("inputText")
            .value = text;

        autoResize(
            document.getElementById("inputText")
        );

        status.innerHTML =
            "✅ Text detected successfully";

        // AUTO TRANSLATE
        await translateText(true);

        status.innerHTML =
            "✅ Translation completed";

        // AUTO CLOSE CAMERA
        setTimeout(() => {

            closeCamera();

        }, 1500);

    } catch (err) {

        console.log(err);

        status.innerHTML =
            "❌ OCR failed";

    }

    scanBtn.disabled = false;

}

// =========================
// FILE MENU
// =========================
function toggleFileMenu() {

    const popup =
        document.getElementById("filePopup");

    popup.style.display =
        popup.style.display === "flex"
            ? "none"
            : "flex";

}

// =========================
// LOAD FILE
// =========================
function loadFile(event) {

    const file =
        event.target.files[0];

    if (!file) return;

    const reader =
        new FileReader();

    reader.onload = function(e) {

        const text =
            e.target.result;

        document.getElementById("inputText")
            .value = text;

        autoResize(
            document.getElementById("inputText")
        );

        translateText();

    };

    reader.readAsText(file);

}
