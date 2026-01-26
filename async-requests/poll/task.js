async function loadPoll() {
  try {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json();

    pollAnswers.innerHTML = '';

    pollTitle.textContent = data.data.title;

    data.data.answers.forEach(answerText => {
      const button = document.createElement('button');
      button.className = 'poll__answer';
      button.textContent = answerText;

      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
      });

      pollAnswers.appendChild(button);
    });

  } catch (error) {
    console.error('Ошибка при загрузке опроса:', error);

    pollTitle.textContent = 'Не удалось загрузить опрос.';
    pollAnswers.innerHTML = `<p style="color: #721c24; font-style: italic;">
                            Проверьте подключение к интернету или обновите страницу.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadPoll);

