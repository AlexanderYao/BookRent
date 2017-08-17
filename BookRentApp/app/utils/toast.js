import Toast from 'react-native-root-toast';

export default class Toasts {
	static show(msg){
		console.log(msg);
		Toast.show(msg, {duration:1000});
	}
}