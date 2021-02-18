let video = document.querySelector('#video');
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      console.log('object');
      video.srcObject = stream;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    })
    .catch((err) => console.log(err));
}
