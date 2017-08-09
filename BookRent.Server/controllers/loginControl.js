import Book from '../models/book';
import moment from 'moment';

export const captcha = (req, res, next) => {
	let phoneNo = req.params.phoneNo;
	console.log('phoneNo: '+phoneNo);
	let result = {
		code: '0000',
		captcha: phoneNo.slice(-4),
		message: 'success',
	};
	res.json(result);
};
