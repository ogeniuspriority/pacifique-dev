import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import classes from './Chats.css';
import Message from './Message/Message';

const Chats = (props) => {
  const [reciever, setReciever] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const style = [classes.Chats];
  if (props.show) {
    style.push(classes.Show);
  }
  return (
    <div className={style.join(' ')}>
      <div className={classes.Title}>
        <p>Chat</p>
      </div>
      <Message
        type="From"
        name="Chris"
        time="12:45"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <Message
        type="From"
        name="Chris"
        time="12:45"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <Message
        type="To"
        name="Chris"
        time="12:45"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <Message
        type="To"
        name="Everyone"
        time="12:45"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
      <div className={classes.Send_Attach}>
        <div className={classes.Choose}>
          <strong style={{ display: 'flex', alignItems: 'center' }}>
            To:
            <Input
              elementType="select"
              elementConfig={{
                options: [
                  {
                    value: 'Chrisis',
                    dispayValue: 'Chris',
                  },
                  {
                    value: 'Chrisi',
                    dispayValue: 'Paul',
                  },
                  {
                    value: 'M',
                    dispayValue: 'Peter',
                  },
                  {
                    value: 'F',
                    dispayValue: 'John',
                  },
                  {
                    value: 'MM',
                    dispayValue: 'Marry',
                  },
                ],
              }}
              value={reciever}
              changed={(event) => setReciever(event.target.value)}
            />
          </strong>
        </div>
        <Input
          elementType="textarea"
          elementConfig={{ placeholder: 'Type here' }}
          value={messageContent}
          changed={(event) => setMessageContent(event.target.value)}
        />
        <div className={classes.Attach}>
          <Button size="Large" btnType="Normal">
            <strong>Attach file</strong>
            <i className="fas fa-paperclip"></i>
          </Button>
          <Button size="Large" btnType="Normal">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
