document.addEventListener('DOMContentLoaded', function() {
  const fullName = document.getElementById('fullName');
  const age = document.getElementById('age');
  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const createAccountButton = document.getElementById('createAccount');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const loginButton = document.getElementById('loginButton');
  const errorMessage = document.getElementById('errorMessage');
  const loginErrorMessage = document.getElementById('loginErrorMessage');

  let accounts = JSON.parse(localStorage.getItem('accounts')) || []; // Retrieve accounts from localStorage

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  function redirectToHome(username) {
      localStorage.setItem('username', username);
      window.location.href = 'home/home.html'; // Redirect to home page
  }

  createAccountButton.addEventListener('click', function(e) {
      e.preventDefault();
      errorMessage.textContent = ''; // Clear previous messages

      if (!fullName.value || !age.value || !username.value || !password.value || !confirmPassword.value) {
          errorMessage.textContent = 'All fields are required.';
          navigator.vibrate(200);
          return;
      }

      if (!validateEmail(email.value)) {
          errorMessage.textContent = 'Your email is invalid.';
          navigator.vibrate(200);
          return;
      }

      if (password.value !== confirmPassword.value) {
          errorMessage.textContent = 'Passwords do not match.';
          navigator.vibrate(200);
          return;
      }

      if (accounts.find(account => account.email === email.value)) {
          errorMessage.textContent = 'Email is already in use.';
          navigator.vibrate(200);
          return;
      }

      // Add new account to accounts array
      accounts.push({
          fullName: fullName.value,
          age: age.value,
          email: email.value,
          username: username.value,
          password: password.value,
      });

      localStorage.setItem('accounts', JSON.stringify(accounts)); // Save accounts to localStorage

      alert('Account created successfully!');
      redirectToHome(username.value);
  });

  loginButton.addEventListener('click', function(e) {
      e.preventDefault();
      loginErrorMessage.textContent = ''; // Clear previous messages

      if (!validateEmail(loginEmail.value)) {
          loginErrorMessage.textContent = 'Your email is invalid.';
          navigator.vibrate(200);
          return;
      }

      if (!loginPassword.value) {
          loginErrorMessage.textContent = 'Your password is invalid.';
          navigator.vibrate(200);
          return;
      }

      const user = accounts.find(account => account.email === loginEmail.value && account.password === loginPassword.value);
      if (user) {
          alert('Logged in successfully!');
          redirectToHome(user.username);
      } else {
          loginErrorMessage.textContent = 'Invalid email or password.';
          navigator.vibrate(200);
      }
  });

  document.getElementById('loginLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('formTitle').textContent = 'Login';
      document.getElementById('formContainer').style.display = 'none';
      document.getElementById('loginContainer').style.display = 'block';
  });

  document.getElementById('createAccountLink').addEventListener('click', function(e) {
      e.preventDefault();
      document.getElementById('formTitle').textContent = 'Create Account';
      document.getElementById('formContainer').style.display = 'block';
      document.getElementById('loginContainer').style.display = 'none';
      errorMessage.textContent = ''; // Clear error messages
  });
});
