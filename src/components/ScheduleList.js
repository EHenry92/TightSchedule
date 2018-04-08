import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, PopUp, ListItem} from './common';
import {fetchSchedules, removeSchedule} from '../actions';
import {pushNotifications} from '../services';
import Logout from './Logout';

class ScheduleList extends Component {
  componentWillMount() {
    this.props.fetchSchedules();
    this.createDataSource(this.props.schedules.sort(compareSchedule));
  }
  // componentDidMount() {
  //   AsyncStorage.getItem('TightSchedule', (err, result) => {
  //     if (err) console.log(err);
  //     if (result) {
  //       console.log("result",result)
  //     }
  //   });
  // }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.schedules.sort(compareSchedule));
  }
  createDataSource(schedules) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(schedules)
  }
  renderScheduleRow (schedule) {
    return <ListItem
            rowData = {schedule.title}
            rightData = {schedule.date}
            onRowPress = {() => {
              Actions.singleSchedule({schedule})
              }}
            onDelPress = {() => {this.props.removeSchedule(schedule.uid)}}
            delText = 'x'
          />
  }
  showNotification () {
    pushNotifications.localNotification({
      bigText: "This is the big text",
      title: "This is the title",
      message: "This is the message right here"
    });
  }
  render () {
    return (
  <View>
    <Card>
      <ListView
        enableEmptySections
        dataSource = {this.dataSource}
        renderRow = {this.renderScheduleRow.bind(this)}>
      </ListView>
    </Card>
    <Logout/>
  </View>
    );
  }
}

const mapState = (state) => {
  const schedules = _.map(state.schedules, (val, uid) => {
    return {...val, uid}
  });
  return {schedules};
  // return {schedules: state.schedules}
};

export default connect(mapState, {fetchSchedules, removeSchedule})(ScheduleList);

function compareSchedule(a, b) {
  if (a.date && !b.date ) {return -1;}
  if (b.date && !a.date ) {return 1;}
  if (a.date < b.date) {return -1;}
  if (b.date < a.date) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}
