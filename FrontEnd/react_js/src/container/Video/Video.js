import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Video.css';

const Video = () => {
  const [link, setLink] = useState('');
  const [stream, setStream] = useState();
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
  return (
    <div className={classes.Video}>
      {video}
      <div className={classes.Start_Container}>
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
          <Link to="/call/video">
            <Button size="Large" btnType="Normal">
              Call
            </Button>
          </Link>
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

export default Video;
