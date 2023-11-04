const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    speechBtn = document.querySelector("button");

let synth = speechSynthesis,
    isSpeaking = true;

voices();

function voices() {
    for (let voice of synth.getVoices()) {

        let selected = voice.name === "Google français " ? "selected" : "";
        let option = `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}
synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {

        if (voice.name === voiceList.value) {
            utternance.voice = voice;
        }
    }
    synth.speak(utternance);
}

speechBtn.addEventListener("click", e => {
    e.preventDefault();



    if (textarea.value !== "") {
        if (!synth.speaking) {
            textToSpeech(textarea.value);
        }

        if (textarea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Lecture";
            } else {
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Résumé Lecture";
            }

            setInterval(() => {
                if (!synth.speakingn && !isSpeaking) {
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        } else {
            speechBtn.innerText = "Convert To speech";
        }

    }
});