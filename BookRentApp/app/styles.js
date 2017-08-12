import React from 'react';
import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
	flexCenter: {
		flex: 1,
		alignItems: 'center',
		margin: 10,
	},
	alignVertical: {
		justifyContent: 'center',
	},
	rowStyle:{
    paddingVertical: 20,
    paddingLeft: 16,
    borderTopColor: 'white',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#E0E0E0',
    borderWidth: 1,
    flexDirection: 'row',
  },
  rowStyleSpace:{
  	justifyContent: 'space-between',
  },
	rowText: {
    alignSelf: 'flex-start', 
    marginTop: 10, 
    marginLeft: 10,
    fontSize: 16,
	},
	rowTitle: {
		fontSize: 18,
		color: 'green',
	},
	rowTextRight: {
		marginRight: 20,
	},
	paragraph: {
		lineHeight: 30,
	},
	image: {
		width: 20,
		height: 20,
	},
	avatar: {
    backgroundColor:'#16A085',
    borderRadius:20,
		width: 60,
		height: 60,
	},
});