import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
} from 'react-native';
import Button from 'apsl-react-native-button';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import Toast from '../utils/toast';
import {
	SUCCESS, 
	loginState,
} from '../utils/constants';
import styles from '../styles';

export default class UserDetailScreen extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			userId: '7894561234567',
			token: '',

			userName: 'AlexanderYao',
			sex: 'male',
			birth: '1985-09-26',
			phoneNo: '13774436724',
			avatar: '',

			sexes: [
				{label:'男', value:'male'},
				{label:'女', value:'female'},
			],

			showChangeName: false,
			showChangeSex: false,
			showChangeBirth: false,
		};

		this.state.tmpUserName = this.state.userName;
		this.state.tmpSex = this.state.sex;
		this.state.tmpBirth = this.state.birth;
	}

	render(){
		return (
			<View>
				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<View style={{flexDirection:'column', justifyContent:'center'}}>
						<Text style={styles.rowText}>头像</Text>
					</View>
					<Image source={require('../images/book.png')} style={[styles.rowTextRight, styles.avatar]}/>
				</View>

				<TouchableOpacity style={[styles.rowStyle, styles.rowStyleSpace]}
					onPress={()=>this.setState({showChangeName:true})}>
					<Text style={styles.rowText}>名字</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.userName}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.rowStyle, styles.rowStyleSpace]}
					onPress={()=>this.setState({showChangeSex:true})}>
					<Text style={styles.rowText}>性别</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.sex}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.rowStyle, styles.rowStyleSpace]}
					onPress={()=>this.setState({showChangeBirth:true})}>
					<Text style={styles.rowText}>生日</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.birth}</Text>
				</TouchableOpacity>

				<View style={[styles.rowStyle, styles.rowStyleSpace]}>
					<Text style={styles.rowText}>手机号</Text>
					<Text style={[styles.rowText, styles.rowTextRight]}>{this.state.phoneNo}</Text>
				</View>

				{/* 弹出框：修改名字 */}
				<Modal animationType={"none"} transparent={true}
					visible={this.state.showChangeName}
					onRequestClose={() => this.changeName()} >
					<View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#80808090'}}>
						<View style={{width:300, height:180, backgroundColor:'white', borderRadius:4, padding:20}}>
							<Text style={[styles.rowText, styles.rowTitle, {marginLeft:0}]}>修改名字</Text>
							<TextInput placeholder="请输入您的名字" autoFocus={true} 
								value={this.state.tmpUserName}
								onChangeText={(text) => this.setState({tmpUserName: text}) }
								style={{borderBottomWidth:1, marginTop:20}}/>
							<Text style={[styles.textSmall, {marginTop:10}]}>仅支持英文、数字的组合，不能为空</Text>
							<View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15}}>
								<Button onPress={()=>this.cancelChangeName()}
									style={{width:70, borderWidth:0}}>取消</Button>
								<Button onPress={()=>this.changeName()}
									style={{width:70, borderWidth:0}}>确定</Button>
							</View>
						</View>
					</View>
				</Modal>

				{/* 弹出框：修改性别 */}
				<Modal animationType={"none"} transparent={true}
					visible={this.state.showChangeSex}
					onRequestClose={() => this.changeSex()} >
					<View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#80808090'}}>
						<View style={{width:300, height:180, backgroundColor:'white', borderRadius:4, padding:20}}>
							<Text style={[styles.rowText, styles.rowTitle, {marginLeft:0}]}>修改性别</Text>
							<RadioForm formHorizontal={true} animation={false}
								radio_props={this.state.sexes} 
								initial={-1}
								style={{marginTop:20, justifyContent:'space-around'}}
								onPress={(value) => this.setState({tmpSex: value})} />
							<View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15}}>
								<Button onPress={()=>this.cancelChangeSex()}
									style={{width:70, borderWidth:0}}>取消</Button>
								<Button onPress={()=>this.changeSex()}
									style={{width:70, borderWidth:0}}>确定</Button>
							</View>
						</View>
					</View>
				</Modal>

				{/* 弹出框：修改生日 */}
				<Modal animationType={"none"} transparent={true}
					visible={this.state.showChangeBirth}
					onRequestClose={() => this.changeBirth()} >
					<View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#80808090'}}>
						<View style={{width:300, height:180, backgroundColor:'white', borderRadius:4, padding:20}}>
							<Text style={[styles.rowText, styles.rowTitle, {marginLeft:0}]}>修改生日</Text>
							<DatePicker date={this.state.tmpBirth}
								mode='date' placeholder='请选择'
								format='YYYY-MM-DD'
								onDateChange={(date) => this.setState({tmpBirth:date})}
								style={{width:'100%', marginTop:20}}
								customStyles={{
									dateInput: { marginLeft:30 }
								}}
							/>
							<View style={{flexDirection:'row', justifyContent:'flex-end', marginTop:15}}>
								<Button onPress={()=>this.cancelChangeBirth()}
									style={{width:70, borderWidth:0}}>取消</Button>
								<Button onPress={()=>this.changeBirth()}
									style={{width:70, borderWidth:0}}>确定</Button>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	static navigationOptions = ({navigation}) =>{
		const {params = {}} = navigation.state;
		return {
			title: '个人详情',
		};
	};

	componentDidMount(){
		console.log('userDetail.componentDidMount');
	}

	cancelChangeName(){
		this.setState({tmpUserName:this.state.userName, showChangeName:false});
	}

	changeName(){
		let isValid = /^\w+$/.test(this.state.tmpUserName);
		console.log('isValid: '+isValid);
		if(!isValid){
			Toast.show('输入不正确');
		}else{
			this.setState({userName:this.state.tmpUserName, showChangeName:false});
		}
	}

	cancelChangeSex(){
		this.setState({tmpSex:this.state.sex, showChangeSex:false});
	}

	changeSex(){
		this.setState({sex:this.state.tmpSex, showChangeSex:false});
	}

	cancelChangeBirth(){
		this.setState({tmpBirth:this.state.birth, showChangeBirth:false});
	}

	changeBirth(){
		this.setState({birth:this.state.tmpBirth, showChangeBirth:false});
	}
}