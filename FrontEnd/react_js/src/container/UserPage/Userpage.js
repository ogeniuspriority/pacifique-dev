import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Userpage.css';
import profile from '../../Assets/images/Ellipse 1.png';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

const Userpage = () => {
  const [link, setLink] = useState('');
  return (
    <Fragment>
      <div className={classes.Info}>
        <div className={classes.Information}>
          <div className={classes.Profile}>
            <img src={profile} alt="" />
          </div>
          <div className={classes.UserInfo}>
            <strong>Jean Paul Munyemana</strong>
            <p>munyemanajpaul@gmail.com</p>
            <p>+250784329869</p>
          </div>
          <Link to="/edit">
            <Button size="Large" btnType="Normal">
              Edit Profile
            </Button>
          </Link>
          <div className={classes.Btn}>
            <Button size="Large" btnType="Normal">
              Copy Link
            </Button>
            <Button size="Large" btnType="Normal">
              Invite People
            </Button>
          </div>
          <i
            className="fas fa-cog"
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              color: '#47a4e7',
            }}
          ></i>
        </div>
      </div>
      <div className={classes.Call}>
        <div className={classes.Call_Container}>
          <div className={classes.StartCall}>
            <Link to="/video">
              <Button size="Large" btnType="Normal">
                Video Call
              </Button>
            </Link>
            <Link to="/audio">
              <Button size="Large" btnType="Normal">
                Audio Call
              </Button>
            </Link>
          </div>
          <div className={classes.Join}>
            <p>Join an ongoing metting</p>
            <div className={classes.JoinMetting}>
              <Input
                elementType="input"
                elementConfig={{
                  type: 'text',
                  placeholder: 'Enter the metting link',
                }}
                value={link}
                changed={(event) => setLink(event.target.value)}
              />
              <Link to="/call/video">
                <Button size="Large" btnType="Normal">
                  Join
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Userpage;
