// code inspired from https://www.w3schools.com/howto/howto_js_accordion.asp

const infoButton = document.getElementById("beat-info-button");
const infoPanel = document.getElementById("beat-info-accordion");

const howToButton = document.getElementById("how-to-button");
const howToPanel = document.getElementById("how-to-accordion");

infoButton.addEventListener("click", function () {
    if (infoPanel.style.maxHeight) {
        infoPanel.style.maxHeight = null;
    } else {
        howToPanel.style.maxHeight = null;
        infoPanel.style.maxHeight = infoPanel.scrollHeight + "px";
    }
});

howToButton.addEventListener("click", function () {
    if (howToPanel.style.maxHeight) {
        howToPanel.style.maxHeight = null;
    } else {
        infoPanel.style.maxHeight = null;
        howToPanel.style.maxHeight = howToPanel.scrollHeight + "px";
    }
});