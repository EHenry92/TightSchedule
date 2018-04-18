import React, {Component} from 'react';
import {View} from 'react-native';
import colors from '../../style/colors';


const Card = (props) => {
  return (
  <View style={[styles.containerStyle,props.style]}>
    {props.children}
  </View>)

};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.outlineColor,
    borderBottomWidth: 0,
    // shadowColor: colors.shadowColor,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    elevation: 1,
    backgroundColor: colors.mainBackgroundColor
  }
};

export {Card};
