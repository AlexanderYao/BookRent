import express, { Router } from 'express';
import { index } from './controllers/bookControl';
import { 
	captcha,
	login,
} from './controllers/loginControl';

const router = Router();

router.route('/books').get(index);

router.route('/captcha/:phoneNo').get(captcha);
router.route('/login').post(login);

export default router;