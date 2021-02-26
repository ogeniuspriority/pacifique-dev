import React from 'react';

import classes from './Signup.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

const Signup = () => {
  return (
    <div>
      <div className={classes.Login_Signup}>
        <div>
          <p>LOG IN</p>
          <div className={classes.Line}></div>
        </div>
        <div>
          <p>SIGN UP</p>
          <div className={classes.Line}></div>
        </div>
      </div>
      <div className={classes.Inputs}>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <input type="file" />
        <Button>UPLOAD</Button>
        <input type="checkbox" value="accept" /> Accept terms and policy
        <section className={classes.Submit}>
          <Button>SIGN UP</Button>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Signup;
