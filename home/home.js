document.addEventListener('DOMContentLoaded', function() {
  const welcomeMessage = document.getElementById('welcomeMessage');
  const logoutButton = document.getElementById('logoutButton');

  const username = localStorage.getItem('username');
  if (!username) {
      alert('You are not logged in.');
      window.location.href = '../index.html'; // Redirect to login page if not logged in
  } else {
      welcomeMessage.textContent = `Welcome, ${username}!`;
  }

  logoutButton.addEventListener('click', function() {
      localStorage.removeItem('username');
      window.location.href = '../index.html'; // Redirect to login page
  });
});
