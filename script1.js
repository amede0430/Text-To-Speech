const textarea = document.querySelector("textarea"),
    voiceList = document.querySelector("select"),
    speechBtn = document.querySelector("button");


function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    // for (let voice of synth.getVoices()) {

    //     if (voice.name === voiceList.value) {
    //         utternance.voice = voice;
    //     }
    // }
    SpeechSynthesis.speak(utternance);
}




speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if (textarea.value !== "") {
        textToSpeech(textarea.value);
    }
});