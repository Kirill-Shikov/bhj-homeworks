document.addEventListener('DOMContentLoaded', () => {
  const book = document.getElementById('book');
  const fontSizeButtons = document.querySelectorAll('.font-size');

  function updateBookFontSize(size) {
    book.classList.remove('book_fs-small', 'book_fs-big');

    if (size === 'small') {
      book.classList.add('book_fs-small');
    } else if (size === 'big') {
      book.classList.add('book_fs-big');
    }

    fontSizeButtons.forEach(btn => {
      btn.classList.remove('font-size_active');
    });

    const activeButton = Array.from(fontSizeButtons).find(btn =>
      btn.getAttribute('data-size') === size
    );
    if (activeButton) {
      activeButton.classList.add('font-size_active');
    }
  }

  fontSizeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      const size = button.getAttribute('data-size');
      updateBookFontSize(size);
    });
  });

  updateBookFontSize('normal');
});
