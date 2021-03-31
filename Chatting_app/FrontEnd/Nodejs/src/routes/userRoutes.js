const express = require('express');

const { signUp, signIn } = require('../controller/userController.js');
const checkSignUp = require('../middleware/checkSignUp.js');
const checkToken = require('../middleware/checkToken.js');
const checkSignIn = require('../middleware/checkSignIn.js');

const router = express.Router();

router.post('/signup', checkSignUp, signUp);
router.post('/signin', checkSignIn, signIn);

module.exports = router;
