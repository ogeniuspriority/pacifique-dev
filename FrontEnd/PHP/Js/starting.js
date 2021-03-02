const participants = document.querySelector('.participants');
const participants_2 = document.querySelector('.participants_2');
const showParticipants = document.querySelector('#participants_2');
showParticipants.addEventListener('click', () => {
  const isOpen = participants_2.classList;
  if (isOpen.contains('show')) {
    isOpen.remove('show');
  } else {
    isOpen.add('show');
  }
  document.querySelector('.users').classList.add('show');
  participants.classList.remove('show');
});
document.querySelector('.users').addEventListener('click', () => {
  participants.classList.add('show');
  participants_2.classList.remove('show');
  document.querySelector('.users').classList.remove('show');
});
