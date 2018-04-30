import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  Image
} from 'react-native';
import {ListItem}from './common';
import {removeTask, completeTask} from '../actions';
import {connect} from 'react-redux';
import colors from '../style/colors';

class Row extends Component {

  constructor(props) {
    super(props);
    this._active = new Animated.Value(0);
    this._style = {
      ...Platform.select({
        ios: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          }],
          shadowRadius: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [{
            scale: this._active.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.07],
            }),
          }],
          elevation: this._active.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      Animated.timing(this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number(nextProps.active),
      }).start();
    }
  }

  render() {
   const {data, active, task, sId, removeTask, completeTask} = this.props;
    return (
      <Animated.View style={[
        styles.row,
        this._style,
      ]}>
        <ListItem
              style = {{flex: 1}}
              rowData = {task.title}
              rightData = {displayTime(task.durationHr, task.durationMin)}
              onRowPress = {() => {}}
              onActionPress = {() => {completeTask(sId, task)}}
              leftAction = {true}
              onDelPress = {() => {removeTask(sId, task.uid);}}
              delText = "X"
              leftActionChild = {
                <Image
                  style={{width: 40, height: 40}}
                  source={require('./imgs/tt.png')}
                />
                }
                leftActionStyle = {{backgroundColor: colors.transparent, borderWidth: 0}}

            />
       </Animated.View>
    );
  }
}

export default connect(null, {completeTask, removeTask})(Row);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: colors.outlineColor,
    // padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 3,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: colors.shadowColor,
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    })
  },

  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },

  text: {
    fontSize: 24,
    color: colors.textColor
  },
});


const displayTime = (hours,min) => {
  if(hours == 0 && min == 0) {
    return '';
  }
  else if(hours > 0 && min > 0) {
    return `${hours}hrs ${min}min`;
  }
  else if(hours > 0) {
    return `${hours}hrs          `;
  }
  else if( min > 0) {
    return `            ${min}min`;
  }
}
