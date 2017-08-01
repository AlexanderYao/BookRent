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
    title: `book name: ${navigation.state.params.book}`,
  });
  render(){
    const { params } = this.props.navigation.state;
    return <Text>书名：{params.book}</Text>;
  }
}