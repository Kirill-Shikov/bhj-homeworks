const modal = document.getElementById('subscribe-modal');
const closeBtn = document.querySelector('.modal__close');

const COOKIE_NAME = 'modalClosed';
const COOKIE_EXPIRES_DAYS = 30;

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(';').shift().trim();
    return cookieValue === 'true';
  }
  return false;
}

function closeModal() {
    modal.classList.remove('modal_active');
    setCookie(COOKIE_NAME,'true', COOKIE_EXPIRES_DAYS);
  }

  function showModalIfNeeded() {
    const isClosed = getCookie(COOKIE_NAME);
    if (!isClosed) {
      modal.classList.add('modal_active');
    }
  }

  closeBtn.addEventListener('click', closeModal);
  
  window.addEventListener('load', showModalIfNeeded);