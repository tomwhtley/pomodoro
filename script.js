let timeLeft;
let timerId = null;
const modeToggle = document.getElementById('mode-toggle');
let isWorkMode = true;
let isRunning = false;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeIndicator = document.getElementById('mode-indicator');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
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
        startButton.textContent = 'Pause';
        document.querySelector('.timer').classList.add('running');
        document.querySelector('.timer').classList.remove('paused');
    } else {
        pauseTimer();
    }
}

function pauseTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        document.querySelector('.timer').classList.remove('running');
        document.querySelector('.timer').classList.add('paused');
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    startButton.textContent = 'Start';
    document.querySelector('.timer').classList.remove('running', 'paused');
    updateDisplay();
}

function switchMode() {
    isWorkMode = !isWorkMode;
    modeIndicator.textContent = isWorkMode ? 'Work Mode' : 'Rest Mode';
    resetTimer();
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    updateDisplay();
}

// Initialize
timeLeft = 25 * 60;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
modeToggle.addEventListener('click', switchMode); 