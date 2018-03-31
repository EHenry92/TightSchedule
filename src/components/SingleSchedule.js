import React, {Component} from 'react';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import { ListItem, Header, Card, Button, CardSection, ImgButton} from './common';
import {removeTask, fetchTasks, changeTask} from '../actions';
import _ from 'lodash';
import SortableList from 'react-native-sortable-list';

class SingleSchedule extends Component {
  componentWillMount() {
    this.props.fetchTasks(this.props.schedule.uid);
    this.createDataSource(this.props.tasks.sort(compareTasks));
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.tasks.sort(compareTasks));
  }
  createDataSource(tasks) {
    // const ds = new ListView.DataSource({
    //   rowHasChanged: (r1, r2) => r1 !== r2
    // });
    // this.dataSource = ds.cloneWithRows(tasks);
    this.dataSource = tasks
  }

  renderTaskRow (task) {
    const {removeTask, schedule, changeTask} = this.props;
    const window = Dimensions.get('window');
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
  startSchedule() {
    //Send push notification annoucing start of schedule and first task
    console.log("schedule started")

  }
  render () {
    console.log("the data sourde", this.dataSource)
    return (
      <View>
        <Header>
          <ImgButton
            style = {{width: 60, height: 60}}
            onPress = {this.startSchedule.bind(this)}
            />

          <Text>
            {this.props.schedule.title}
          </Text>
        </Header>
        <Card>
          {/* <ListView
            enableEmptySections
            dataSource = {this.dataSource}
            renderRow = {this.renderTaskRow.bind(this)}>
          </ListView> */}
          <SortableList
          contentContainerStyle={{width: '100%'}}
          data={this.dataSource}
          renderRow={this.renderTaskRow.bind(this)} />
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


function compareTasks(a, b) {
  if (!a.complete && b.complete ) {return -1;}
  if (!b.complete && a.complete ) {return 1;}
  if (a.startTime < b.startTime || (a.startTime && !b.startTime)) {return -1;}
  if (b.startTime < a.startTime || (b.startTime && !a.startTime)) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}

//a < b --> -1
//a > b --> 1
//a == b --> 0
