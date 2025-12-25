function getHole(index) {
  return document.getElementById(`hole${index}`);
}

let dead = 0;
let lost = 0;

function updateScore() {
  document.getElementById('dead').textContent = dead;
  document.getElementById('lost').textContent = lost;
}

function handleClick(event) {
  const hole = event.target;

  if (hole.classList.contains(`hole_has-mole`)) {
    dead++;
  } else {
    lost++;
  }

  updateScore();

  if (dead >= 5) {
    showGameOverMessage('Победа! Вы уничтожили 5 кротов!');
    return;
  }

  if (lost >= 5) {
    showGameOverMessage('Поражение! Вы промахнулись 5 раз.');
    return;
  }

  showMole();
}

function showGameOverMessage(message) {
  alert(message);
  gameOver = true;
  dead = 0;
  lost = 0;
  gameOver = false;

  updateScore();
}

for (let i = 1; i <= 9; i++) {
    const hole = getHole(i);
    hole.onclick = handleClick;
}
showMole();