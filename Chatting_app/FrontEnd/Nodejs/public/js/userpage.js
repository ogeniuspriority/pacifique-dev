if (!localStorage.getItem('Authorization')) {
  window.location.href = '/login';
} else {
  document.getElementById('profile').src = localStorage.getItem('profile');
  document.getElementById('name').innerText = localStorage.getItem('name');
  document.getElementById('email').innerText = localStorage.getItem('email');
  document.getElementById('phone').innerText = localStorage.getItem('phone');
  document.getElementById('setting').addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/login';
  });
}
