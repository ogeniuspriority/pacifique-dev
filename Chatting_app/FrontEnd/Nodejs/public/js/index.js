let upload = document.querySelector('#upload');
let names = document.querySelector('#name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let gender = document.querySelector('#gender');
let password = document.querySelector('#password');
let profile = document.querySelector('#profile');
let errorDiv = document.querySelector('#error');
upload.addEventListener('click', () => profile.click());
document.getElementById('submit').addEventListener('click', async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const data = {
    name: names.value,
    email: email.value,
    phone: phone.value,
    gender: gender.value,
    password: password.value,
    profile: profile.files[0],
  };
  for (const prop in data) {
    formData.append(prop, data[prop]);
  }
  const response = await fetch('/api/signup', {
    method: 'POST',
    body: formData,
  });
  const newData = await response.json();
  if (newData.error) {
    errorDiv.innerHTML = newData.error;
  } else {
    localStorage.setItem('Authorization', `${newData.results.token}`);
    localStorage.setItem('profile', `${newData.results.profile}`);
    localStorage.setItem('name', `${newData.results.name}`);
    localStorage.setItem('email', `${newData.results.email}`);
    localStorage.setItem('phone', `${newData.results.phone}`);
    window.location.href = '/userpage';
  }
});
