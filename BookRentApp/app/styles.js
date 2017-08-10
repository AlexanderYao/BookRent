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
	paragraph: {
		lineHeight: 30,
	}
});