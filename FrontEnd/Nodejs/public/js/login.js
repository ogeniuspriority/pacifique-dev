let email = document.querySelector('#email');
let password = document.querySelector('#password');
let errorDiv = document.querySelector('#error');
document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const response = await fetch('/api/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });
  const newData = await response.json();
  if (newData.error) {
    errorDiv.innerHTML = newData.error;
  } else {
    localStorage.setItem('Authorization', `${newData.results.token}`);
    window.location.href = '/userpage';
  }
});
