import React, {Component} from 'react';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { ListItem, Header, Card, Button, CardSection} from './common';
import {removeTask, fetchTasks, changeTask} from '../actions';
import _ from 'lodash';

class SingleSchedule extends Component {
  componentWillMount() {
    this.props.fetchTasks(this.props.schedule.uid);
    this.createDataSource(this.props.tasks.sort(compare));
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.tasks.sort(compare));
  }
  createDataSource(tasks) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(tasks);
  }
  renderTaskRow (task) {
    const {removeTask, schedule, changeTask} = this.props;
    return (
      <ListItem
              rowData = {task.title}
              rightData = {task.startTime}
              onRowPress = {() => {console.log("pressing row")}}
              onActionPress = {() => {changeTask(schedule.uid, task.uid, {complete: !task.complete || true})}}
              leftAction = {true}
              onDelPress = {() => {removeTask(schedule.uid, task.uid);}}
              delText = "x"
              disabled = {task.complete || false}
            />
            );
  }
  render () {
    return (
      <View>
        <Header title={this.props.schedule.title} />
        <Card>
          <ListView
            enableEmptySections
            dataSource = {this.dataSource}
            renderRow = {this.renderTaskRow.bind(this)}
            >
          </ListView>
        </Card>
      </View>
    );
  }
}

const mapState = (state) => {
  const tasks = _.map(state.tasks, (val, uid) => {
    return {...val, uid};
  });
  return {tasks};
};

export default connect(mapState, {removeTask, fetchTasks, changeTask})(SingleSchedule);


function compare(a, b) {
  if (a.complete == false ||(a.startTime && (a.startTime < b.startTime)) ) {
    return -1;
  }
  if (b.complete == false || (b.startTime && (b.startTime < a.startTime))) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

//a < b --> -1
//a > b --> 1
//a == b --> 0
