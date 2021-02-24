import express from 'express';

const Router = express.Router();

Router.get('/video', async (req, res) => {
  res.render('dashboard');
});
Router.get('/audio', async (req, res) => {
  res.render('audioDashboard');
});

export default Router;
