import React from 'react';
import classes from './Participants.css';
import viewList from '../../Assets/images/view_list.svg';
import viewComfy from '../../Assets/images/view_comfy.svg';
import user1 from '../../Assets/images/Rectangle 18.svg';
import user2 from '../../Assets/images/user2.svg';
import user3 from '../../Assets/images/Rectangle 20.svg';
import Participant from './Participant/Participant';

const Participants = (props) => {
  const style = [classes.Participants];
  if (props.show) {
    style.push(classes.Show);
  }
  return (
    <div className={style.join(' ')}>
      <div className={classes.Title}>
        <p>Participants</p>
        <div>
          <img src={viewList} alt="" />
          <img src={viewComfy} alt="" />
        </div>
      </div>
      <Participant image={user1} />
      <Participant image={user2} />
      <Participant image={user3} />
      <div className={classes.Down}>
        <i className="fas fa-angle-down"></i>
      </div>
    </div>
  );
};

export default Participants;
