import React from 'react';
import {View} from 'react-native';



const Header = (props) => {
  const {viewStyle} = styles;
  return (
    <View style={viewStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    flexDirection: 'row'
  }
};

export {Header};
