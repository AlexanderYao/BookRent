import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import styles from '../styles';
import {
  books,
  SUCCESS,
} from '../utils/constants';

export default class ShopcartScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      bookList: [],
    };
  }

  static navigationOptions = ({navigation}) =>{
    const {params = {}} = navigation.state;
    return {
      title: '书架',
      headerRight: (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => params.handleRefresh()}>
            <Image source={require('../images/refresh.png')} style={{height:30, width:30}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => params.handleScan()} >
            <Image source={require('../images/scanning.png')} style={{height:20, width:20, marginLeft:10, marginRight:10, marginTop:5}}/>
          </TouchableOpacity>
        </View>
      ),
    };
  };

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FlatList data={this.state.bookList}
          renderItem={({item}) => 
            <View style={styles.rowStyle}>
              <Text style={styles.rowText}
                onPress={() => navigate('ShopcartDetail', {book: item})}>
                {item.title}:   {item.author}
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  componentDidMount(){
    this.props.navigation.setParams({
      handleRefresh: () => this.getBooks(),
      handleScan: () => this.scan(),
    });
    this.getBooks();
  }

  async getBooks(){
    try{
      console.log('shopcart.getBooks');
      let res = await fetch(books);
      let resJson = await res.json();
      console.log(resJson);
      resJson.forEach(item => item.key = item.id);
      this.setState({bookList: resJson});
    }catch(error){
      console.error(error);
    }
  }

  scan(){
    console.log('in scan');
  }
}