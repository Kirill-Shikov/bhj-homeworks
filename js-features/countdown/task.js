const timerElement = document.getElementById("timer");

let timerValue = 59;

function formatTime(totalSeconds) {
const hours = Math.floor(totalSeconds / 3600);
const minutes = Math.floor((totalSeconds % 3600) / 60);
const seconds = totalSeconds % 60;

const paddedHours = String(hours).padStart(2, "0");
const paddedMinutes = String(minutes).padStart(2, "0");
const paddedSeconds = String(seconds).padStart(2, "0");

return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

function updateTimer() {
  timerValue--;

  if (timerElement) {
    timerElement.textContent = formatTime(timerValue);
  }

  if (timerValue <= 0) {
    clearInterval(timerInterval);
    alert("вы победили в конкурсе!");
  }
}

const timerInterval = setInterval(updateTimer,1000);

function downloadfile(url,filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById('downloadBtn').addEventListener('click', function() {
    downloadfile('http://hello.kitty', 'kitty');
});