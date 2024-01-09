document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');

  loginButton.addEventListener('click', function() {
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;
    // Добавьте код для отправки данных авторизации на сервер
    console.log(`Login: Email - ${loginEmail}, Password - ${loginPassword}`);
  });

  registerButton.addEventListener('click', function() {
    const registerEmail = document.getElementById('registerEmail').value;
    const registerPassword = document.getElementById('registerPassword').value;
    // Добавьте код для отправки данных регистрации на сервер
    console.log(`Register: Email - ${registerEmail}, Password - ${registerPassword}`);
  });
});
