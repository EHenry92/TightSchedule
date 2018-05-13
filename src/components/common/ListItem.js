import React from 'react';
import {Text, TouchableWithoutFeedback, View,TouchableOpacity} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';
import {Card} from './Card';
import colors from '../../style/colors';


const ListItem = ({rowData,style, onRowPress, rightData, leftAction = false, onActionPress, leftActionChild, delText, onDelPress, disabled, leftActionStyle, textStyle}) => {
    return (
      <View style ={style}>
          <CardSection>
            {
            leftAction &&
            <View style={[styles.sideButtonContianerStyle, leftActionStyle]}>
              <TouchableOpacity
                style = {styles.sideButtonStyle}
                onPress={onActionPress}
                >
                {leftActionChild}
            </TouchableOpacity>
            </View>
            }
            <TWF viewStyle={styles.mainDataStyle} onPress={onRowPress}>
                <Text style = {[styles.titleStyle, textStyle]}>
                  {rowData}
                </Text>
                <Text style={[styles.subTextStyle, textStyle]}>
                  {rightData}
                </Text>
            </TWF>
            <TWF viewStyle = {styles.rightDataStyle} onPress={onDelPress}>
              <Text>
                {delText}
              </Text>
            </TWF>
          </CardSection>
      </View>
    );
};

const styles = {
  sideButtonContianerStyle: {
    backgroundColor: colors.coral,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.outlineColor,
  },
  sideButtonStyle: {
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5
  },
  titleStyle: {
    fontSize: 20
  },
  rightDataStyle: {
    alignSelf: 'flex-end'
  },
  mainDataStyle: {
    flex: 5,
    paddingLeft: 15
  },
  subTextStyle: {
  }
};

export {ListItem};


const TWF = ({viewStyle, children, onPress}) => (
  <View style = {viewStyle}>
  <TouchableWithoutFeedback onPress={onPress}>
    <View>
      {children}
    </View>
  </TouchableWithoutFeedback>
</View>
);
