import Book from '../models/book';
import moment from 'moment';

// let phoneNo = '';

export const recharge = (req, res, next) => {
	console.log(req.body);
	let userId = req.body.userId;
	let rechargeAmt = req.body.rechargeAmt;
	let payType = req.body.payType;
	let result = {
		code: '0000',
		message: '支付成功',
		orderInfo: 'app_id=2015052600090779&biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.01%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22IQJZSRC1YMQB5HU%22%7D&charset=utf-8&format=json&method=alipay.trade.app.pay&notify_url=http%3A%2F%2Fdomain.merchant.com%2Fpayment_notify&sign_type=RSA2&timestamp=2016-08-25%2020%3A26%3A31&version=1.0&sign=cYmuUnKi5QdBsoZEAbMXVMmRWjsuUj%2By48A2DvWAVVBuYkiBj13CFDHu2vZQvmOfkjE0YqCUQE04kqm9Xg3tIX8tPeIGIFtsIyp%2FM45w1ZsDOiduBbduGfRo1XRsvAyVAv2hCrBLLrDI5Vi7uZZ77Lo5J0PpUUWwyQGt0M4cj8g%3D',
		orderId: '170814000D00000013',
		// data: {
		// 	app_id: '2014072300007148',
		// 	method: 'alipay.trade.app.pay',
		// 	format: 'JSON',
		// 	charset: 'utf-8',
		// 	sign_type: 'RSA2',
		// 	sign: 'MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D',
		// 	timestamp: '2017-08-08 12:12:15',
		// 	version: '1.0',
		// 	notify_url: 'https://api.xx.com/receive_notify.htm',
		// 	biz_content: {
		// 		timeout_express: '30m',
		// 		seller_id: '123456789',
		// 		product_code: 'QUICK_MSECURITY_PAY',
		// 		total_amount: '28.88',
		// 		subject: 'test subject',
		// 		body: 'test body',
		// 		out_trade_no: '33333333333',
		// 		store_id: '1001',
		// 	}
		// },
	};
	res.json(result);
};

// app_id=2015052600090779&
// biz_content=%7B%22timeout_express%22%3A%2230m%22%2C%22seller_id%22%3A%22%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%2C%22total_amount%22%3A%220.02%22%2C%22subject%22%3A%221%22%2C%22body%22%3A%22%E6%88%91%E6%98%AF%E6%B5%8B%E8%AF%95%E6%95%B0%E6%8D%AE%22%2C%22out_trade_no%22%3A%22314VYGIAGG7ZOYY%22%7D&
// charset=utf-8&
// method=alipay.trade.app.pay&
// sign_type=RSA2&
// timestamp=2016-08-15%2012%3A12%3A15&
// version=1.0&
// sign=MsbylYkCzlfYLy9PeRwUUIg9nZPeN9SfXPNavUCroGKR5Kqvx0nEnd3eRmKxJuthNUx4ERCXe552EV9PfwexqW%2B1wbKOdYtDIb4%2B7PL3Pc94RZL0zKaWcaY3tSL89%2FuAVUsQuFqEJdhIukuKygrXucvejOUgTCfoUdwTi7z%2BZzQ%3D
