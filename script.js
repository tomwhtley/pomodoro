let timeLeft;
let timerId = null;
const modeToggle = document.getElementById('mode-toggle');
let isWorkMode = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                alert(isWorkMode ? 'Work session completed! Take a break!' : 'Break is over! Back to work!');
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

function switchMode() {
    isWorkMode = !isWorkMode;
    modeToggle.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
    resetTimer();
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

// Initialize
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('click', switchMode); 