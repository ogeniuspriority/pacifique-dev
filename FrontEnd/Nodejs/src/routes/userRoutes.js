import express from 'express';

import { signUp, signIn } from '../controller/userController.js';
import checkSignUp from '../middleware/checkSignUp.js';
import checkToken from '../middleware/checkToken.js';
import checkSignIn from '../middleware/checkSignIn.js';

const router = express.Router();

router.post('/signup', checkSignUp, signUp);
router.post('/signin', checkSignIn, signIn);

export default router;
