import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {pushNotifications} from '../services';

class Timer extends Component{
  constructor(){
    super();
    this.startSchedule = this.startSchedule.bind(this);
  }
  startSchedule({curr}) {
      pushNotifications.localNotification({
        // title: `${name}`,
        // message: `${curr} for ${curr.durationHr} hrs ${curr.durationMin} min`
        title: 'Title of schedule',
        message: 'Time to start //first task'
      });
      //send end and next
      pushNotifications.scheduleNotification({
        // title: `${name}`,
        // message: `Times up for ${curr}!`, // (required)
        // date: new Date(Date.now() + (curr.durationMin * 3600 * 1000) + (curr.durationHr * 216000 * 1000)),
        // actions: '["End", "Next"]'
        title: 'Same Title',
        message: 'another message',
        date: new Date(Date.now() + (60 * 1000))
      });
      //set as complete
  }
  render () {
    return (
      <View>
        <TouchableHighlight
          style = {{flex: 1, padding: 7}}
          onPress={()=>{this.startSchedule({})}}>
          <Text>
            Start
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

}

mapState = (state) => {
  return {}
};
mapDispatch = {};
export default connect(mapState, mapDispatch)(Timer);

