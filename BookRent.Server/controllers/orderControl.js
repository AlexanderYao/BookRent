import Book from '../models/book';
import moment from 'moment';

export const orders = (req, res, next) => {
	let userId = req.params.userId;
	let fromIndex = req.query.from;
	let toIndex = req.query.to;
	let orders = [];
	orders.push({orderId:'26662689', store:'1号店', price:30, orderTime:Date.now(), payTime:Date.now() });
	orders.push({orderId:'1041482',  store:'1号店', price:30, orderTime:Date.now(), payTime:Date.now() });
	orders.push({orderId:'1056315',  store:'1号店', price:30, orderTime:Date.now() }); 
	orders.push({orderId:'6827339',  store:'2号店', price:20, orderTime:Date.now() }); 
	orders.push({orderId:'1858513',  store:'2号店', price:20, orderTime:Date.now(), payTime:Date.now() }); 
	orders.push({orderId:'19989296', store:'2号店', price:20, orderTime:Date.now(), payTime:Date.now() }); 

	res.json(orders);
};
