import React, {Component} from 'react';
import {
  ScrollView,
  ListView,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import format from 'string-format';
import {
  doubanApi,
} from '../utils/constants';
import styles from '../styles';

export default class ShopcartDetailScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      book: {
        images: {},
        author: [],
        translator: [],
      },
      summary: '展开',
      summaryLineNum: 5,
      author: '展开',
      authorLineNum: 5,
      catalog: '展开',
      catalogLineNum: 5,
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.book.title}`,
  });

  render(){
    let { book } = this.state;
    return (
      <ScrollView>
        <View style={styles.flexCenter}>
          <Image source={{uri: book.images.large}} style={{width:200, height:300}}/>
          <Text style={styles.rowText}>作者：{book.author.join(' / ')}</Text>
          <Text style={styles.rowText}>出版社：{book.publisher}</Text>
          <Text style={styles.rowText}>原著名：{book.origin_title}</Text>
          <Text style={styles.rowText}>译著：{book.translator.join(' / ')}</Text>
          <Text style={styles.rowText}>出版年：{book.pubdate}</Text>
          <Text style={styles.rowText}>页数：{book.pages}</Text>
          <Text style={styles.rowText}>定价：{book.price}</Text>
          <Text style={styles.rowText}>装帧：{book.binding}</Text>
          <Text style={styles.rowText}>ISBN：{book.isbn13}</Text>

          <Text style={[styles.rowText, styles.rowTitle]}>内容简介：
            (<Text onPress={() => this.toggleExpand('summary')}>{this.state.summary}</Text>)
          </Text>
          <Text style={[styles.rowText, styles.paragraph]} 
            numberOfLines={this.state.summaryLineNum}>{book.summary}</Text>

          <Text style={[styles.rowText, styles.rowTitle]}>作者简介：
            (<Text onPress={() => this.toggleExpand('author')}>{this.state.author}</Text>)
          </Text>
          <Text style={[styles.rowText, styles.paragraph]} 
            numberOfLines={this.state.authorLineNum}>{book.author_intro}</Text>

          <Text style={[styles.rowText, styles.rowTitle]}>目录：
            (<Text onPress={() => this.toggleExpand('catalog')}>{this.state.catalog}</Text>)
          </Text>
          <Text style={[styles.rowText, styles.paragraph]} 
            numberOfLines={this.state.catalogLineNum}>{book.catalog}</Text>
        </View>
      </ScrollView>
    );
  }

  componentDidMount(){
    this.getBook();
  }

  async getBook(){
    try{
      let request = {
        id: this.props.navigation.state.params.book.id,
      };
      let url = format(doubanApi, request);
      console.log(url);
      let res = await fetch(url);
      let resJson = await res.json();
      console.log(resJson);
      this.setState({ book: resJson });
    }catch(error){
      console.error(error);
    }
  }

  toggleExpand(prefix){
    let varName = prefix;
    let varNameLineNum = prefix + 'LineNum';
    console.log(varNameLineNum);
    let expand = this.state[varNameLineNum] === null;
    console.log(this.state[varNameLineNum]);
    if(expand){
      this.setState({
        [varName]: '展开',
        [varNameLineNum]: 5,
      });
    }else{
      this.setState({
        [varName]: '收起',
        [varNameLineNum]: null,
      });
    }
  }
}