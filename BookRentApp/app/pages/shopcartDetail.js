import React, {Component} from 'react';
import {
  ListView,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

export default class ShopcartDetailScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.book.title}`,
  });
  render(){
    const { book } = this.props.navigation.state.params;
    return (
      <View>
        <Text>ID：{book.id}</Text>
        <Text>书名：{book.title}</Text>
        <Text>作者：{book.author}</Text>
      </View>
    );
  }
}