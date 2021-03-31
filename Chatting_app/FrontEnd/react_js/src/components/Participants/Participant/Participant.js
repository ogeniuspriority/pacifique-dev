import React from 'react';

import classes from './Participant.css';

const Participant = (props) => {
  return (
    <div className={classes.Participant}>
      <i className="fas fa-ellipsis-v"></i>
      <img src={props.image} alt="" />
    </div>
  );
};

export default Participant;
