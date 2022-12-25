const body = document.querySelector('body');
const allBtn = {
    startBtn: document.querySelectorAll('button')[0],
    stopBtn: document.querySelectorAll('button')[1],
}

allBtn.startBtn.addEventListener('click', onClikStartBtn);
allBtn.stopBtn.addEventListener('click', onClikStopBtn);

onDisabled(allBtn.stopBtn);
let intervalId = null;

function onClikStartBtn() {
    onDisabled(allBtn.startBtn);
    closeDisabled(allBtn.stopBtn);
    intervalId = setInterval(() => {
        let newColor = getRandomHexColor();
        console.log(newColor);
        body.style.backgroundColor = newColor;
    }, 1000)
}

function onClikStopBtn() {
    closeDisabled(allBtn.startBtn);
    onDisabled(allBtn.stopBtn);
    clearInterval(intervalId);
}

function onDisabled(btn) {
    btn.setAttribute('disabled', 'disabled');
}

function closeDisabled(btn) {
    btn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}