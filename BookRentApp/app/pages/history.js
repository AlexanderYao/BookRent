import React, {Component} from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import format from 'string-format';
import * as constants from '../utils/constants';
import styles from '../styles';

export default class HistoryScreen extends Component {
	constructor(props){
		super(props);

		this.state = {
			userId: 'AlexanderYao',
			userName: '邬文尧',
			token: '',
			from: 1,
			to: 10,
			orders: [],
		};
	}

	render(){
		const {navigate} = this.props.navigation;
							console.log(this.state.orders);
		return (
			<View>
				<ScrollableTabView
					scrollWithoutAnimation={true}
				>
					<View tabLabel='所有订单'>
						{
							this.state.orders.map((item, i) => {
								return (
									// <OrderItem order={item} key={i} navigation={this.props.navigation}/>
									<View style={styles.rowStyle} key={i}>
										<Text style={styles.rowText}
											onPress={() => navigate('OrderDetail', {orderId:item.orderId})}>
											{item.store}:   {item.price}
										</Text>
									</View>
								);
							})
						}
					</View>
					<View tabLabel='未支付订单'></View>
					<View tabLabel='已支付订单'></View>
				</ScrollableTabView>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '历史订单',
		};
	};

	componentDidMount(){
		console.log('history.componentDidMount');
		this.getOrders();
	}

	async getOrders(){
		try{
			let request = {
				userId: this.state.userId,
				from: this.state.from,
				to: this.state.to,
			};
			let url = format(constants.getOrderHistory, request);
			let response = await fetch(url);
			console.log(response);
			let resJson = await response.json();
			console.log(resJson);
			this.setState({orders:resJson});
		}catch(error){
			console.error(error);
		}
	}
}

class OrderItem extends Component {
	constructor(props){
		super(props);
		console.log('OrderItem.constructor');
	}

	render(){
		console.log('OrderItem.render');
		const {navigate} = this.props.navigation;
		const {order} = this.props;
		console.log(order);
		return (
			<View style={styles.rowStyle}>
				<Text style={styles.rowText}
					onPress={() => navigate('OrderDetail', {orderId:order.orderId})}>
					{order.store}:   {order.price}
				</Text>
			</View>
		)
	}
}