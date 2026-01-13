document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    reveals.forEach(element => {
      const windowHeight = window.innerHeight; 
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('reveal_active');
      }
    });
  }

  checkReveal();
  window.addEventListener('scroll', checkReveal);
});