import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import viewImage from '../../../Assets/images/view_comfy.svg';
import share from '../../../Assets/images/screen_share.svg';

import classes from '../../Video/Video.css';
import { Link } from 'react-router-dom';
import Participants from '../../../components/Participants/Participants';
import Participants2 from '../../../components/Participants_2/Participants_2';
import Chats from '../../../components/Chats/Chats';

const Video = () => {
  const [stream, setStream] = useState();
  const [showParticipants, setShowParticipants] = useState(false);
  const [showParticipants_2, setShowParticipants_2] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const userVideo = useRef();
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  let video;
  if (stream) {
    video = <video className={classes.Myvideo} ref={userVideo} autoPlay />;
  }
  const showParticipantsHandler = () => {
    setShowParticipants(!showParticipants);
    setShowParticipants_2(false);
    setShowChats(false);
  };
  const showParticipants_2Handler = () => {
    setShowParticipants_2(!showParticipants_2);
    setShowParticipants(false);
    setShowChats(false);
  };
  const showChatsHandler = () => {
    setShowChats(!showChats);
    setShowParticipants_2(false);
    setShowParticipants(false);
  };
  const users = [
    { name: 'Jakob Botosh', id: '1' },
    { name: 'Jakob Botosh', id: '2' },
    { name: 'Jakob Botosh', id: '3' },
    { name: 'Jakob Botosh', id: '4' },
    { name: 'Jakob Botosh', id: '5' },
    { name: 'Jakob Botosh', id: '6' },
    { name: 'Jakob Botosh', id: '7' },
    { name: 'Jakob Botosh', id: '8' },
    { name: 'Jakob Botosh', id: '9' },
  ];
  return (
    <div className={classes.Video}>
      <div className={classes.Users}>
        <Button clicked={showParticipantsHandler} size="Small" btnType="Normal">
          <img src={viewImage} alt="" />
        </Button>
      </div>
      <div className={classes.Plus}>
        <Button size="Small" btnType="Normal">
          <i className="fas fa-user-plus"></i>
        </Button>
      </div>
      {video}
      <Participants show={showParticipants} />
      <Participants2 users={users} show={showParticipants_2} />
      <Chats show={showChats} />
      <div className={classes.Settings}>
        <div className={classes.Setting} id="participants_2_mobile">
          <i className="fas fa-user-friends"></i> <span>Participants</span>
        </div>
        <hr />
        <div className={classes.Setting} id="chat_mobile">
          <i className="fas fa-comment-alt"></i> <span>Chat</span>
        </div>
        <hr />
        <div className={classes.Setting}>
          <i className="fas fa-record-vinyl"></i>
          <span>Record</span>
        </div>
        <hr />
        <div className={classes.Setting} id="cancel">
          <span>Cancel</span>
        </div>
      </div>
      <div className={classes.Buttons}>
        <div className={classes.First}>
          <Button size="Small" btnType="Normal">
            <i className="fas fa-microphone-slash"></i>
          </Button>
          <Button size="Small" btnType="Normal">
            <i className="fas fa-video"></i>
          </Button>
          <Button
            clicked={showParticipants_2Handler}
            size="Small"
            btnType="Normal"
          >
            <i className="fas fa-user-friends"></i>
          </Button>
          <Button clicked={showChatsHandler} size="Small" btnType="Normal">
            <i className="fas fa-comment-alt"></i>
          </Button>
          <Button size="Small" btnType="Normal">
            <i className="fas fa-record-vinyl"></i>
          </Button>
          {/* <Button size="Small" btnType="Normal">
            <img src={share} alt="" />
          </Button> */}
          <Link to="/userpage">
            <Button size="Small" btnType="Danger">
              <i
                style={{ transform: 'rotate(-135deg)' }}
                className="fas fa-phone"
              ></i>
            </Button>
          </Link>
        </div>
        <div className={classes.Share}>
          <strong
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Share screen <img src={share} alt="" />
          </strong>
        </div>
        <div className={classes.Second}>
          <Button size="Small" btnType="Normal">
            {window.screen.width > 750 ? (
              <i className="fas fa-cog"></i>
            ) : (
              <i className="fas fa-ellipsis-h"></i>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Video;
