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
import styles from '../styles.js';

export default class ShopcartScreen extends Component {
  constructor(props){
    super(props);

    const bookList = [
      {key:0, name:'平凡的世界',author:'[中]路遥'},
      {key:1, name:'画的秘密',author:'[法]马克-安托万·马修'},
      {key:2, name:'万历十五年',author:'[美]黄仁宇'},
      {key:3, name:'我也有一个梦想',author:'[中]林达'},
      {key:4, name:'琅琊榜',author:'[中]海宴'},
    ];

    this.state = {
      bookList: bookList,
    };
  }

  static navigationOptions = {
    title: '书架',
  };

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FlatList data={this.state.bookList}
          renderItem={({item}) => 
            <View style={styles.rowStyle}>
              <Text style={styles.rowText}
                onPress={() => navigate('ShopcartDetail', {book: item.name})}>
                {item.name}:   {item.author}
              </Text>
            </View>
          }
        />
      </View>
    );
  }
}