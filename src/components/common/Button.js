import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import colors from '../../style/colors';


const Button = (props) => {
  const {buttonStyle, textStyle} = styles;
  const {children, onPress, styleButton, disabled} = props;
  return (
  <TouchableOpacity style = {[buttonStyle, styleButton]} onPress={onPress} disabled={disabled || false}>
    <Text style={textStyle}>
      {children}
    </Text>
  </TouchableOpacity>);
}

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.coral,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.outlineColor,
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: colors.textColor,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export {Button};
