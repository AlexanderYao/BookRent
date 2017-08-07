export default class Constants {
	static SUCCESS = '0000';
	static urlPrefix = 'http://www.yunna.me/api/v1/';
	
	// services
	static getCaptcha = this.urlPrefix + 'captcha/{phoneNo}';
	static login = this.urlPrefix + 'login';
	static bind = this.urlPrefix + 'bind';
	static entry = this.urlPrefix + 'entry?userId={userId}&token={token}';
	static getOrderHistory = this.urlPrefix + 'order/list/{userId}?from={from}&to={to}';
	static getOrderInfo = this.urlPrefix + 'order/{orderId}';
	static getUserInfo = this.urlPrefix + 'user/info/{userId}';
	static updateUserInfo = this.urlPrefix + 'user/info';

	// storages
	static loginState = 'loginState';
}