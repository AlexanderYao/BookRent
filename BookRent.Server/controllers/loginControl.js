import Book from '../models/book';
import moment from 'moment';

// let phoneNo = '';

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

export const login = (req, res, next) => {
	console.log(req.body);
	let phoneNo = req.body.phoneNo;
	let captcha = req.body.captcha;
	let result = {
		code: '0000',
		token: 'AD775KJAL456K63D',
		userId: phoneNo,
	};
	res.json(result);
}