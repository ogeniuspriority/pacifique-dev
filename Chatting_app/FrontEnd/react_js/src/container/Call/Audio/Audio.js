import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Chats from '../../../components/Chats/Chats';
import Participants from '../../../components/Participants/Participants';
import Participants2 from '../../../components/Participants_2/Participants_2';
import Button from '../../../components/UI/Button/Button';
import classes from '../../Audio/Audio.css';
import viewImage from '../../../Assets/images/view_comfy.svg';
import Input from '../../../components/UI/Input/Input';
import image from '../../../Assets/images/Ellipse 3.svg';

const Audio = () => {
  const [link, setLink] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showParticipants_2, setShowParticipants_2] = useState(false);
  const [showChats, setShowChats] = useState(false);
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
    <div className={classes.Audio}>
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
      <div className={classes.Start_Container}>
        <div className={classes.Audio_Start}>
          <div className={classes.Myaudio}>
            <img src={image} alt="" />
          </div>
          <div className={classes.Start}>
            <Input
              elementType="input"
              elementConfig={{
                type: 'text',
                placeholder: 'Enter the user link here',
              }}
              value={link}
              changed={(event) => setLink(event.target.value)}
            />
            <Link to="/call/audio">
              <Button size="Large" btnType="Normal">
                Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.Buttons}>
        <div className={classes.First}>
          <Button size="Small" btnType="Normal">
            <i className="fas fa-microphone-slash"></i>
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

export default Audio;
