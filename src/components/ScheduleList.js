import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import Actions from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, Confirm, ListItem} from './common';
import {fetchSchedules} from '../actions';

class ScheduleList extends Component {
  componentWillMount() {
    this.props.fetchSchedules();
    this.createDataSource(this.props.schedules);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.schedules);
  }
  createDataSource(schedules) {
    console.log("this is th eschedule dta", schedules)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(schedules)
  }
  renderScheduleRow (schedule) {
    return <ListItem
            rowData = {schedule.title}
            sideData = {schedule.date}
            onRowPress = {() => {
              console.log("should be changing to single schedule page")
            }}
          />
  }
  render () {
    return (
      // <Text>  The list belongs here</Text>
      <ListView
        enableEmptySections
        dataSource = {this.dataSource}
        renderRow = {this.renderScheduleRow}
      >
      </ListView>
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

export default connect(mapState, {fetchSchedules})(ScheduleList);
