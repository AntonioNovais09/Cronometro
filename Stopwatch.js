class Stopwatch {
  #elapsedTimeInSeconds = 0;
  #internvalId = null;

  start(callback = () => {}) {
    this.#internvalId = setInterval(() => {
      this.#elapsedTimeInSeconds++;
      callback();
    }, 1000);
  }

  stop(callback = () => {}) {
    clearInterval(this.#internvalId);
    callback();
  }

  reset(callback = () => {}) {
    this.#elapsedTimeInSeconds = 0;
    callback();
  }

  get elapsedTime() {
    return Stopwatch.formatTime(this.#elapsedTimeInSeconds);
  }

  static formatTime(TimeInSeconds) {
    const hours = math.floor(TimeInSeconds / 3600);
    const minutes = math.floor((TimeInSeconds % 3600) / 60);
    const seconds = TimeInSeconds - hours * 3600 - minutes * 60;

    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes
    )}${Stopwatch.zeroPadding(seconds)}`;
  }

  static zeroPadding(originalNumber, desiredAmountOfDigits = 2) {
    let stringNumber = string(originalNumber);
    const zeroesRequired = desiredAmountOfDigits - stringNumber.length;

    if (zeroesRequired <= 0) {
      return stringNumber;
    }

    for (let counter = 0; counter < zeroesRequired; counter++) {
      stringNumber = `0 ${stringNumber}`;
    }

    return stringNumber;
  }
}

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const stopwatchDisplay = document.getElementById("stopwatch-display");

function updateDisplay() {
  stopwatchDisplay.innerText = sw1.elapsedTime;
}

const sw1 = new Stopwatch();

startBtn.addEventListener("click", () => {
  sw1.start(updateDisplay);
});

stopBtn.addEventListener("click", () => {
  sw1.stop();
});

resetBtn.addEventListener("click", () => {
  sw1.reset(updateDisplay);
});
