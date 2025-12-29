document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {

    const valueEl = dropdown.querySelector('.dropdown__value');
    const listEl = dropdown.querySelector('.dropdown__list');
    const items = dropdown.querySelectorAll('.dropdown__item');


    valueEl.addEventListener('click', (e) => {
      e.stopPropagation();
      listEl.classList.toggle('dropdown__list_active');
    });


    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        valueEl.textContent = item.textContent.trim();

        listEl.classList.remove('dropdown__list_active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        listEl.classList.remove('dropdown__list_active');
      }
    });
  });
});
