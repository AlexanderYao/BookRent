import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import Button from 'apsl-react-native-button';
import Toast from 'react-native-root-toast';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
	RadioButtons
} from 'react-native-radio-buttons';
import {
	SUCCESS, 
	loginState,
} from '../utils/constants';
import styles from '../styles';

export default class TopupScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: 'AlexanderYao',
			userName: '邬文尧',
			token: '',
			enumMoney: [
				{label:'充500元', value:500},
				{label:'充100元', value:100},
				{label:'充50元', value:50},
				{label:'充10元', value:10},
			],
			enumPayTypes: [
				{label:'支付宝支付', value:'zhifubao'},
				{label:'微 信 支 付 ', value:'weixin'},
			],
			money: 10,
			payType: 'zhifubao',
			payTypeIndex: 0,
		};
	}

	render(){
		return (
			<View>
				<View style={styles.rowStyle}>
					<Text style={styles.rowText}>充值金额</Text>
				</View>

				<RadioButtons options={this.state.enumMoney}
					onSelection={(option) => this.setState({money: option.value})}
					selectedOption={this.state.money}
					renderOption={this.renderOption}
					renderContainer={this.renderContainer}
					extractText={(option) => option.label}
					testOptionEqual={(selectedValue, option) => selectedValue === option.value}
				/>

				<View style={styles.rowStyle}>
					<Text style={styles.rowText}>请选择支付方式</Text>
				</View>

				<RadioForm initial={'zhifubao'}
					animation={false}
				>
					{this.state.enumPayTypes.map((obj, i) => {
						let that = this;
						let isSelected = this.state.payTypeIndex == i;
						let onPress = (value, index) => {
							this.setState({
								payType: value,
								payTypeIndex: index,
							})
						};
						return (
							<RadioButton key={i} style={{margin:10}}>
								<RadioButtonLabel
									obj={obj}
									index={i}
									onPress={onPress}
									labelStyle={{fontSize:16}}
								/>
								<RadioButtonInput
									obj={obj}
									index={i}
									isSelected={this.state.payTypeIndex === i}
									onPress={onPress}
									buttonSize={10}
									buttonStyle={{marginLeft:200}}
								/>
							</RadioButton>
						)
					})}
				</RadioForm>

				<Button style={styles.rowButton} 
					onPress={() => this.props.navigation.navigate('TopupZhifubao')}>
					立即充值
				</Button>

				<Text style={{fontSize:12, marginLeft:30}}>
					点击立即充值，即表示您已阅读并同意《充值活动协议》
				</Text>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '充值',
		};
	};

	componentDidMount(){
		console.log('topup.componentDidMount');
	}

	renderOption(option, selected, onSelect, index){
		const style = {
			width: 150,
			borderWidth: 1,
			padding: 10,
			margin: 10,
			fontSize: 20,
			textAlign: 'center',
			borderColor: 'gray',
			borderRadius: 4,
		};
		const styleSelected = selected ? {backgroundColor:'gold'} : {};
		return (
			<TouchableOpacity key={index} onPress={onSelect}>
				<Text style={[style, styleSelected]}>{option.label}</Text>
			</TouchableOpacity>
		)
	}

	renderContainer(optionNodes){
		return <View style={{
			flexDirection:'row', 
			flexWrap:'wrap',
			justifyContent:'center',
		}}>{optionNodes}</View>
	}
}