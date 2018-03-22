import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';
import {Card} from './Card';


const ListItem = ({rowData, onRowPress, rightData, leftAction = false, onActionPress, actionText, delText, onDelPress}) => {
    return (
      <View>
      <CardSection>
        {
        leftAction &&
        <View style={{width: 25}}>
          <Button styleButton={styles.sideButtonStyle} onPress = {onActionPress}>
            {actionText}
          </Button>
        </View>
        }
        <View style={styles.mainDataStyle} >
          <TouchableWithoutFeedback onPress={onRowPress}>
            <View>
            <Text style = {styles.titleStyle}>
              {rowData}
            </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style = {styles.rightDataStyle}>
          <TouchableWithoutFeedback onPress={onDelPress}>
            <View>
              <Text style={{textAlign: 'right'}}>
                {delText}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <Text>
            {rightData}
          </Text>
        </View>
      </CardSection>
      </View>
    );
};

const styles = {
  sideButtonStyle: {
    width: 25,
    height: 25
  },
  titleStyle: {
    fontSize: 20,
    paddingLeft: 15
  },
  rightDataStyle: {
    alignSelf: 'flex-end'
  },
  mainDataStyle: {
    flex: 5
  }
};

export {ListItem};
