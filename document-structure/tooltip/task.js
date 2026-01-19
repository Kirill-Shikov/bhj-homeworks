document.addEventListener(`DOMContentLoaded`,() => {
  const tooltipElements = document.querySelectorAll(`.has-tooltip`);
  let currentActiveTooltip = null;

  function hideAllTooltips() {
    if (currentActiveTooltip) {
      currentActiveTooltip.classList.remove('tooltip_active');
      currentActiveTooltip = null;
    }
  }

  tooltipElements.forEach(element => {
    const tooltip = document.createElement(`div`);
    tooltip.className = `tooltip`;
    tooltip.textContent = element.getAttribute(`title`);
    element.appendChild(tooltip);

    element.addEventListener(`click`, (e) => {
      e.preventDefault();

      if (currentActiveTooltip === tooltip) {
        hideAllTooltips();
        return;
      }
      hideAllTooltips();

      tooltip.classList.add('tooltip_active');
      currentActiveTooltip = tooltip;

      document.addEventListener('click', closeTooltip, { once: true });
    });

    function closeTooltip(e) {
      if (!element.contains(e.target)) {
        tooltip.classList.remove('tooltip_active');
      }
    }
  });
});