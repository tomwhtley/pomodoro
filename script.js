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
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const startButton = document.getElementById('start');
    
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
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        startButton.classList.add('running');
        document.querySelector('.timer').classList.add('running');
        document.querySelector('.timer').classList.remove('paused');
    } else {
        pauseTimer();
    }
}

function pauseTimer() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const startButton = document.getElementById('start');
    
    if (isRunning) {
        isRunning = false;
        clearInterval(timerId);
        timerId = null;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        startButton.classList.remove('running');
        document.querySelector('.timer').classList.remove('running');
        document.querySelector('.timer').classList.add('paused');
    }
}

function resetTimer() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const startButton = document.getElementById('start');
    
    isRunning = false;
    clearInterval(timerId);
    timerId = null;
    timeLeft = isWorkMode ? 25 * 60 : 5 * 60;
    playIcon.classList.remove('hidden');
    pauseIcon.classList.add('hidden');
    startButton.classList.remove('running');
    document.querySelector('.timer').classList.remove('running', 'paused');
    updateDisplay();
}

function switchMode() {
    isWorkMode = !isWorkMode;
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    const modeToggle = document.getElementById('mode-toggle');
    
    if (isWorkMode) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        modeToggle.classList.remove('rest-mode');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        modeToggle.classList.add('rest-mode');
    }
    
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