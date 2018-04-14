import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';
import {Card} from './Card';

const ListItem = ({rowData,style, onRowPress, rightData, leftAction = false, onActionPress, actionText, delText, onDelPress, disabled}) => {
    return (
      <View style ={style}>
      {/* {
        disabled ?
          <CardSection style = {{ opacity: 0.4, minHeight: 40}}>
            {
          leftAction &&
          <View style={{width: 25}}>
            <Button disabled styleButton={[styles.sideButtonStyle, {backgroundColor: 'white'}]}/>
          </View>
          }
            <Text style = {styles.titleStyle}>
              {rowData}
            </Text>
          </CardSection>
        : */}
          <CardSection>
            {
            leftAction &&
            <View style={styles.sideButtonContianerStyle}>
              <Button styleButton={styles.sideButtonStyle} onPress = {onActionPress}>
                {actionText}
              </Button>
            </View>
            }
            <TWF viewStyle={styles.mainDataStyle} onPress={onRowPress}>
                <Text style = {styles.titleStyle}>
                  {rowData}
                </Text>
                <Text style={styles.subTextStyle}>
                  {rightData}
                </Text>
            </TWF>
            <TWF viewStyle = {styles.rightDataStyle} onPress={onDelPress}>
              <Text>
                {delText}
              </Text>
            </TWF>
          </CardSection>
        {/* } */}
      </View>
    );
};

const styles = {
  sideButtonContianerStyle: {
    width: 25,
    paddingTop: 10
  },
  sideButtonStyle: {
    width: 20,
    height: 20
  },
  titleStyle: {
    fontSize: 20,
    // justifyContnet: 'space-around'
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
