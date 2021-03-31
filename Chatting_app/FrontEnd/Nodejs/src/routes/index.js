const axios = require('axios');
const express = require('express');
const { v4: uuidV4 } = require('uuid');

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
  res.redirect(`/video/${uuidV4()}`);
});
Router.get('/video/:room', async (req, res) => {
  res.render('starting', { roomId: req.params.room });
});
Router.get('/audio', async (req, res) => {
  res.render('audioStarting');
});

module.exports = Router;
