document.addEventListener(`DOMContentLoaded`,() => {
  const tooltipElements = document.querySelectorAll(`.has-tooltip`);
  let currentActiveTooltip = null;
  const tooltipsContainer = document.createElement('div');
  tooltipsContainer.className = 'tooltips-container';
  document.body.appendChild(tooltipsContainer);

  function hideAllTooltips() {
    if (currentActiveTooltip) {
      currentActiveTooltip.classList.remove('tooltip_active');
      currentActiveTooltip = null;
    }
  }

  tooltipElements.forEach(element => {
    const tooltipText = element.getAttribute('title');
    element.removeAttribute('title');

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    tooltipsContainer.appendChild(tooltip);

    element.addEventListener(`click`, (e) => {
      e.preventDefault();

      if (currentActiveTooltip === tooltip) {
        hideAllTooltips();
        return;
      }

      hideAllTooltips();

      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left}px`;
      tooltip.style.top = `${rect.bottom}px`;

      tooltip.classList.add('tooltip_active');
      currentActiveTooltip = tooltip;

      document.addEventListener('click', closeTooltip, { once: true });
    });

    function closeTooltip(e) {
      if (!element.contains(e.target) && !tooltip.contains(e.target)) {
        hideAllTooltips(); 
      }
    }
  });
});