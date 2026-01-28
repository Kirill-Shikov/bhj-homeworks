document.addEventListener('DOMContentLoaded', () => {
  const signin = document.getElementById('signin');
  const welcome = document.getElementById('welcome');
  const userIdSpan = document.getElementById('user_id');
  const signinForm = document.getElementById('signin__form');
  const signinBtn = document.getElementById('signin__btn');
  const signoutBtn = document.getElementById('signout__btn');

  function checkAuthStatus() {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      userIdSpan.textContent = storedUserId;
      welcome.classList.add('welcome_active');
      signin.classList.remove('signin_active');
    } else {
      signin.classList.add('signin_active');
      welcome.classList.remove('welcome_active');
    }
  }

  async function handleSignin(event) {
    event.preventDefault();

    const formData = new FormData(signinForm);
    const login = formData.get('login');
    const password = formData.get('password');

    try {
      const response = await fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem('user_id', result.user_id);
        userIdSpan.textContent = result.user_id;
        welcome.classList.add('welcome_active');
        signin.classList.remove('signin_active');
        clearForm();
      } else {
        alert('Неверный логин/пароль');
        clearForm();
      }
    } catch (error) {
      alert('Ошибка сети. Попробуйте снова.');
      clearForm();
    }
  }

  function handleSignout() {
    localStorage.removeItem('user_id');
    welcome.classList.remove('welcome_active');
    signin.classList.add('signin_active');
    clearForm();
  }

  function clearForm() {
    signinForm.reset();
  }

  checkAuthStatus();

  signinBtn.addEventListener('click', handleSignin);
  signinForm.addEventListener('submit', handleSignin);

  if (signoutBtn) {
    signoutBtn.addEventListener('click', handleSignout);
  }
});