import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './CardSection';

const ListItem = ({rowData, onRowPress, sideData}) => {
    return (
      <TouchableWithoutFeedback onPress={onRowPress}>
      <View>
        <CardSection>
          <Text style = {styles.titleStyle}>
            {rowData}
          </Text>
          <Text style = {styles.sideDataStyle}>
            {sideData}
          </Text>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
    );
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    flex: 2
  },
  sideDataStyle: {
    fontSize: 10,
    alignSelf: 'flex-end',
    textAlign: 'right',
    flex: 1
  }
}

export {ListItem};
