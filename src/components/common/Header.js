import React from 'react';
import {View} from 'react-native';
import colors from '../../style/colors';




const Header = (props) => {
  const {viewStyle} = styles;
  return (
    <View style={[viewStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: colors.mainBackgroundColor,
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    flexDirection: 'row',
    marginTop: 10
  }
};

export {Header};
