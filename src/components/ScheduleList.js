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
    // this.createDataSource(this.props.schedules);
  }
  // componentWillReceiveProps(nextProps) {
  //   this.createDataSource(nextProps.schedules);
  // }
  // createDataSource(schedules) {
  //   const ds = new ListView.createDataSource({
  //     rowHasChanged: (r1, r2) => r1 !== r2
  //   });
  //   this.dataSource = ds.cloneWithRows(schedules)
  // }
  // renderScheduleRow (schedule) {
  //   return <ListItem
  //           rowData = {schedule.title}
  //           onRowPress = {() => {
  //             // Actions.taskForm()
  //             console.log("should be changing to single schedule page")
  //           }}
  //         />
  // }
  render () {
    console.log("this props", this.props.schedules)
    return (
      <Text>  The list belongs here</Text>
      // <ListView
      //   enableEmptySections
      //   dataSource = {this.dataSource}
      //   renderRow = {this.renderScheduleRow}
      // >
      // </ListView>
    );
  }
}

const mapState = (state) => {
  // const schedules = _.map(state.schedules, (uid) => {
  //   return {...val, uid}
  // });
  // return {schedules};
  return {schedules: state.schedules}
};

export default connect(mapState, {fetchSchedules})(ScheduleList);
