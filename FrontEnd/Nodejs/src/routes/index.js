import axios from 'axios';
import express from 'express';

const Router = express.Router();

Router.get('', async (req, res) => {
  res.render('signup');
});
Router.get('/login', async (req, res) => {
  res.render('login');
});
Router.get('/userpage', async (req, res) => {
  res.render('userpage');
});
Router.get('/update', async (req, res) => {
  res.render('update');
});
Router.get('/video', async (req, res) => {
  res.render('starting');
});
Router.get('/audio', async (req, res) => {
  res.render('audioStarting');
});

export default Router;
