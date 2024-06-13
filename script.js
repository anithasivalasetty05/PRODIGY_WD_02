let timer;
let startTime;
let elapsedTime = 0;
let paused = true;
let lapTimes = [];

const display = document.getElementById('display');
const lapsElement = document.getElementById('laps');

// Initialize display with "00:00:00"
display.textContent = formatTime(elapsedTime);

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('restart').addEventListener('click', restartTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('resetLaps').addEventListener('click', resetLaps);

function startTimer() {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10); // Update every 10 milliseconds for milliseconds precision
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
    }
}

function resetTimer() {
    paused = true;
    clearInterval(timer);
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    resetLaps();
}

function restartTimer() {
    if (!paused) {
        pauseTimer();
    }
    
    // Reset elapsed time to 0
    elapsedTime = 0;
    display.textContent = formatTime(elapsedTime);
    
    // Start the timer again
    startTimer();
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
}

function padTime(value) {
    return value < 10 ? `0${value}` : value;
}

function recordLap() {
    if (!paused) {
        const lapTime = elapsedTime;
        lapTimes.push(lapTime);
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapTimes.length}: ${formatTime(lapTime)}`;
        lapsElement.appendChild(lapElement);
    }
}

function resetLaps() {
    lapTimes = [];
    lapsElement.innerHTML = '';
}
