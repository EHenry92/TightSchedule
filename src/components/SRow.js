import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {ListItem }from './common';
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
              rightData = {`${task.durationHr}hrs ${task.durationMin}min`}
              onRowPress = {() => {console.log("pressing row")}}
              onActionPress = {() => {completeTask(sId, task)}}
              leftAction = {true}
              onDelPress = {() => {removeTask(sId, task.uid);}}
              delText = "x"
              disabled = {task.complete || false}
            />
       </Animated.View>
    );
  }
}

export default connect(null, {completeTask, removeTask})(Row);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.outlineColor,
    padding: 16,
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
