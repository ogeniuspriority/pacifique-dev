import React from 'react';
import classes from './Participant_2.css';

const Participant_2 = (props) => {
  return (
    <div className={classes.Participant_2}>
      <img src={props.img} alt="" />
      <p>{props.name}</p>
      <div className={classes.Btn}>
        <div>
          <i className="fas fa-microphone-slash"></i>
        </div>
        <div>
          <i className="fas fa-video-slash"></i>
        </div>
      </div>
    </div>
  );
};

export default Participant_2;
