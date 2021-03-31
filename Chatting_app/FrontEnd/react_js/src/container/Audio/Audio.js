import React, { useState } from 'react';
import classes from './Audio.css';
import image from '../../Assets/images/Ellipse 3.svg';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { Link } from 'react-router-dom';

const Audio = () => {
  const [link, setLink] = useState('');
  return (
    <div className={classes.Audio}>
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
