import React from 'react';
import classes from './Participants_2.css';
import partImage from '../../Assets/images/Ellipse 2.svg';
import Participant2 from './Participant_2/Participant_2';

const Participants_2 = (props) => {
  const style = [classes.Participants_2];
  if (props.show) {
    style.push(classes.Show);
  }
  return (
    <div className={style.join(' ')}>
      <p className={classes.Title}>Participants</p>
      {props.users.map((user) => (
        <Participant2 key={user.id} img={partImage} name={user.name} />
      ))}
    </div>
  );
};

export default Participants_2;
