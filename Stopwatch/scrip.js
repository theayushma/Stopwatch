let stopwatchInterval;
let elapsedTime = 0; // Time in milliseconds
let isRunning = false;

// Get the elements
const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

// Function to update the display with hh:mm:ss format
function updateDisplay() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    // Add leading zero to hours, minutes, and seconds if they are less than 10
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to start or stop the stopwatch
function startStop() {
    if (!isRunning) {
        startStopBtn.textContent = 'Stop';
        isRunning = true;

        // Record the start time by subtracting the elapsed time from the current time
        const startTime = Date.now() - elapsedTime;

        // Start the interval to update the time every 100 milliseconds (for smoother display)
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 100); // Update every 100ms for accuracy
    } else {
        startStopBtn.textContent = 'Start';
        isRunning = false;

        // Stop the interval when stopping the stopwatch
        clearInterval(stopwatchInterval);
    }
}

// Function to reset the stopwatch
function reset() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    updateDisplay();
}

// Attach event listeners to buttons
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

// Initialize display with 00:00:00 at the beginning
updateDisplay();
