import React from 'react';

import classes from './Message.css';

const Message = (props) => {
  return (
    <div className={`${classes.Message} ${classes[props.type]}`}>
      <div className={classes.Details}>
        <strong>{`${
          props.type === 'from' ? 'From' : 'To'
        } : ${props.name}`}</strong>
        <strong>{props.time}</strong>
      </div>
      <p>{props.content}</p>
    </div>
  );
};

export default Message;
