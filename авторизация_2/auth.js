document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  const loginSection = document.getElementById('loginSection');
  const mainSection = document.getElementById('mainSection');

  // Проверка, авторизован ли пользователь (допустим, по наличию токена в localStorage)
  const isLoggedIn = localStorage.getItem('token');

  if (isLoggedIn) {
    showMainSection();
  } else {
    showLoginSection();
  }

  loginButton.addEventListener('click', function() {
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    // Здесь должен быть код для отправки данных авторизации на сервер
    // После успешной аутентификации сохраните токен в localStorage
    localStorage.setItem('token', 'example_token');
    showMainSection();
  });

  function showLoginSection() {
    loginSection.style.display = 'block';
    mainSection.style.display = 'none';
  }

  function showMainSection() {
    loginSection.style.display = 'none';
    mainSection.style.display = 'block';
  }
});
