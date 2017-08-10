import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  FlatList,
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
      headerRight: <Button title="刷新" onPress={() => params.handleRefresh()} />,
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
    this.props.navigation.setParams({handleRefresh: () => this.getBooks()});
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
}