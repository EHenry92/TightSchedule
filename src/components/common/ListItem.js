import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';

const ListItem = ({rowData, onRowPress, rightData, leftAction = false, onActionPress, actionText}) => {
    return (
      <View>
      <TouchableWithoutFeedback onPress={onRowPress}>
      <View>
        <CardSection>
        {
        leftAction &&
          <Button onPress = {onActionPress}>
            {actionText}
          </Button>
        }
          <Text style = {styles.titleStyle}>
            {rowData}
          </Text>
          <Text style = {styles.rightDataStyle}>
            {rightData}
          </Text>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
      </View>
    );
};

const styles = {
  sideButtonStyle: {
    flex: 1
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 6
  },
  rightDataStyle: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    flex: 3
  }
};

export {ListItem};
