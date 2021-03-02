import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './Signup.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { checkValidity, updateObject } from '../../shared/utility';

const Signup = () => {
  const [controls, setControls] = useState({
    Names: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Names',
      },
      value: '',
      validation: {
        required: false,
      },
    },
    Email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    Phone: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Phone',
      },
      value: '',
      validation: {
        required: true,
        isValidNumber: true,
      },
      valid: false,
      touched: false,
    },
    Gender: {
      elementType: 'select',
      elementConfig: {
        options: [
          {
            value: 'M',
            dispayValue: 'Male',
          },
          {
            value: 'F',
            dispayValue: 'Female',
          },
        ],
      },
      value: '',
      validation: {
        required: false,
      },
    },
    Password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 8,
      },
      valid: false,
      touched: false,
    },
    'Profile Picture': {
      elementType: 'button',
      elementConfig: {
        type: 'button',
      },
      value: 'UPLOAD',
      validation: {
        required: false,
      },
    },
  });
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setControls(updatedControls);
  };
  const formElementArray = [];
  for (let key in controls) {
    formElementArray.push({
      id: key,
      config: controls[key],
    });
  }
  const form = formElementArray.map((formElement) => (
    <Input
      key={formElement.id}
      label={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));
  return (
    <div className={classes.Signup}>
      <div className={classes.Login_Signup}>
        <div className={classes.LoginDiv}>
          <Link to="/login">
            <p>LOG IN</p>
            <div className={classes.Line}></div>
          </Link>
        </div>
        <div className={classes.SignupDiv}>
          <p>SIGN UP</p>
          <div className={classes.Line}></div>
        </div>
      </div>
      <div className={classes.Inputs}>
        {form}
        <input type="file" />
        <section>
          <input type="checkbox" value="accept" /> Accept terms and policy
        </section>
        <section className={classes.Submit}>
          <Link to="/userpage">
            <Button size="Large" btnType="Normal">
              SIGN UP
            </Button>
          </Link>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Signup;
