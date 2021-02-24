const participants = document.querySelector('.participants');
const participants_2 = document.querySelector('.participants_2');
const chat = document.querySelector('.chat');
const showParticipants = document.querySelector('#participants_2');
const showParticipantsMobile = document.querySelector('#participants_2_mobile');
const settings = document.querySelector('.settings');
const users = document.querySelector('.users');
const chatBtn = document.querySelector('#chat');
const chatBtnMobile = document.querySelector('#chat_mobile');
const showParticipant = () => {
  const isOpen = participants_2.classList;
  if (isOpen.contains('show')) {
    isOpen.remove('show');
  } else {
    isOpen.add('show');
  }
  document.querySelector('.users').classList.add('show');
  participants.classList.remove('show');
  chat.classList.remove('show');
  settings.classList.remove('show');
};
showParticipants.addEventListener('click', () => {
  showParticipant();
});
showParticipantsMobile.addEventListener('click', () => {
  showParticipant();
});
users.addEventListener('click', () => {
  const isOpen = participants.classList;
  if (isOpen.contains('show')) {
    isOpen.remove('show');
  } else {
    isOpen.add('show');
  }
  participants_2.classList.remove('show');
  chat.classList.remove('show');
  settings.classList.remove('show');
});
const showChats = () => {
  const isOpen = chat.classList;
  if (isOpen.contains('show')) {
    isOpen.remove('show');
  } else {
    isOpen.add('show');
  }
  participants.classList.remove('show');
  participants_2.classList.remove('show');
  settings.classList.remove('show');
};
chatBtn.addEventListener('click', () => {
  showChats();
});
chatBtnMobile.addEventListener('click', () => {
  showChats();
});
const cancelAll = () => {
  
}
document.querySelector('.second').addEventListener('click', () => {
  const isOpen = settings.classList;
  if (isOpen.contains('show')) {
    isOpen.remove('show');
  } else {
    isOpen.add('show');
  }
});
