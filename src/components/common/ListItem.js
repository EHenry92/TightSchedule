import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {CardSection} from './CardSection';

const ListItem = ({rowData, onRowPress}) => {
    return (
      <TouchableWithoutFeedback onPress={onRowPress}>
      <View>
        <CardSection>
          <Text style = {styles.titleStyle}>
            {rowData}
          </Text>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
    );
};

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
}

export {ListItem};
