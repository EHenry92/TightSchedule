import React, {Component} from 'react';
import {View} from 'react-native';
import colors from '../../style/colors';


const CardSection = (props) => {
  return (
  <View style={[styles.containerStyle, props.style]}>
    {props.children}
  </View>);

};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: colors.outlineColor,
    position: 'relative',
    margin: 5
  }
};

export {CardSection};
