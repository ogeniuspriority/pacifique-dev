const express = require('express');

const Router = express.Router();

Router.get('/video', async (req, res) => {
  res.render('dashboard');
});
Router.get('/audio', async (req, res) => {
  res.render('audioDashboard');
});

module.exports = Router;
