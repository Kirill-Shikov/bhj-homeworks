const counterElement = document.getElementById(`clicker__counter`);
const cookieElement = document.getElementById(`cookie`);
const speedElement = document.getElementById(`clicker__speed`);

let clickCount = 0;
let lastClickTime = null;

cookieElement.addEventListener(`click`, () => {
  clickCount++;
  counterElement.textContent = clickCount;

  const currentTime = new Date();

  if (lastClickTime !== null) {
    const timeDiff = (currentTime - lastClickTime) / 1000;

    const speed = 1 / timeDiff;

    speedElement.textContent = speed.toFixed(2);
  } else {
    speedElement.textContent = `0.00`;
  }

  lastClickTime = currentTime;

  if (clickCount % 2 === 1) {
    cookieElement.style.width = `240px`;
  } else {
    cookieElement.style.width = `200px`;
  }
  });