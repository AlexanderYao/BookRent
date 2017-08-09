import express, { Router } from 'express';
import { index } from './controllers/bookControl';
import { 
	captcha,
	login,
	entry,
} from './controllers/loginControl';

const router = Router();

router.route('/books').get(index);

router.route('/captcha/:phoneNo').get(captcha);
router.route('/login').post(login);
router.route('/entry').get(entry);

export default router;