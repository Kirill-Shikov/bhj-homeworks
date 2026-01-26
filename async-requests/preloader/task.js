async function loadCurrencyRates() {
  try {
    const loader = document.getElementById('loader');
    const itemsContainer = document.getElementById('items');

    loader.classList.add('loader_active');

    const response = await fetch('https://students.netoservices.ru/nestjs-backend/slow-get-courses');

    if (!response.ok) {
      throw new Error(`HTTP-ошибка: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.response || !data.response.Valute) {
      throw new Error('Неверный формат ответа от сервера');
    }

    const valute = data.response.Valute;

    itemsContainer.innerHTML = '';

    for (const code in valute) {
      if (valute[code]) {
        const currency = valute[code];
        const itemHTML = `
          <div class="item">
            <div class="item__code">${currency.CharCode}</div>
            <div class="item__value">${currency.Value.toFixed(2)}</div>
            <div class="item__currency">руб.</div>
          </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', itemHTML);
      }
    }

  } catch (error) {
    console.error('Ошибка при загрузке курсов валют:', error);

    itemsContainer.innerHTML = `
      <p class="error-message">
        Не удалось загрузить курсы валют. <br>
        Проверьте подключение или обновите страницу.
      </p>
    `;
  } finally {
    loader.classList.remove('loader_active');
  }
}

document.addEventListener('DOMContentLoaded', loadCurrencyRates);