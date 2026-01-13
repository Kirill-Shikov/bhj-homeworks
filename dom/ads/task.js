document.addEventListener('DOMContentLoaded', () => {
  const rotators = document.querySelectorAll('.rotator');

  rotators.forEach(rotator => {
    const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
    
    let currentIndex = cases.findIndex(caseEl =>
      caseEl.classList.contains('rotator__case_active')
    );

    if (currentIndex === -1 && cases.length > 0) {
      currentIndex = 0;
      cases[currentIndex].classList.add('rotator__case_active');
    }

    function rotate() {
      cases.forEach(caseEl => {
        caseEl.classList.remove('rotator__case_active');
      });

      currentIndex = (currentIndex + 1) % cases.length;

      cases[currentIndex].classList.add('rotator__case_active');

      const color = cases[currentIndex].getAttribute('data-color');

      if (color) {
        cases[currentIndex].style.color = color;
      }

      const nextSpeed = parseInt(cases[currentIndex].getAttribute('data-speed')) || 1000;

      clearTimeout(rotator.rotateTimeout);
      rotator.rotateTimeout = setTimeout(rotate, nextSpeed);
    }

    const firstSpeed = parseInt(cases[currentIndex].getAttribute('data-speed')) || 1000;
    rotator.rotateTimeout = setTimeout(rotate, firstSpeed);
  });
});