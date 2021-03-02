import React from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './App.css';
import Signup from './container/Signup/Signup';
import Login from './container/Login/Login';
import Userpage from './container/UserPage/Userpage';
import Video from './container/Video/Video';
import Audio from './container/Audio/Audio';
import CallVideo from './container/Call/Video/Video';
import CallAudio from './container/Call/Audio/Audio';

const App = () => {
  const routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/userpage" component={Userpage} />
      <Route path="/video" component={Video} />
      <Route path="/call/video" component={CallVideo} />
      <Route path="/userpage" component={Userpage} />
      <Route path="/audio" component={Audio} />
      <Route path="/call/audio" component={CallAudio} />
      <Route path="/" exact component={Signup} />
    </Switch>
  );
  return <div className={classes.App}>{routes}</div>;
};

export default App;
