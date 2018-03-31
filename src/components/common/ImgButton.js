import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const ImgButton = ({imgSource, onPress, children, style}) => {
  return (
    <TouchableOpacity onPess={onPress} style={[styles.buttonStyle, style]}>
      <Image source={imgSource} style={styles.imgStyle}/>
        {children}
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    opacity: 0.5
  }
};

export {ImgButton};
