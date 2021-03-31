const socket = io('/');
let videoGrid = document.getElementById('video_grid');
const myPeer = new Peer(
  undefined,
  {
    path: '/peerjs',
    host: '/',
    port: '5000',
  },
  { debug: 3 }
);
const myVideo = document.createElement('video');
myVideo.muted = true;

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    addVideoStream(myVideo, stream);
    myPeer.on('call', (call) => {
      call.answer(stream);
    });
    socket.on('user-connected', (userId) => {
      connectToNewUser(userId, stream);
    });
  })
  .catch((err) => console.log(err));

myPeer.on('open', (id) => {
  socket.emit('join-room', ROOM_ID, id);
});
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
};
const connectToNewUser = (userId, stream) => {
  try {
    const call = myPeer.call(userId, stream);
    const userVideo = document.createElement('video');
    userVideo.muted = true;
    call.on('stream', (userVideoStream) => {
      console.log('object');
      addVideoStream(userVideo, userVideoStream);
    });
    call.on('close', () => {
      video.remove();
    });
  } catch (error) {
    console.log(error);
  }
};
