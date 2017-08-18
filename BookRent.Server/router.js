import express, { Router } from 'express';
import { index } from './controllers/bookControl';
import { 
	captcha,
	login,
	entry,
} from './controllers/loginControl';
import {
	recharge
} from './controllers/tradeControl';
import {
	orders
} from './controllers/orderControl';

const router = Router();

router.route('/books').get(index);

router.route('/captcha/:phoneNo').get(captcha);
router.route('/login').post(login);
router.route('/entry').get(entry);

router.route('/recharge').post(recharge);
router.route('/order/list/:userId').get(orders);

export default router;