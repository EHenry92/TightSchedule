import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import {connect} from 'react-redux';
import { ListItem, Header} from './common';
import {removeTask, fetchTasks} from '../actions';
import _ from 'lodash';

class SingleSchedule extends Component {
  componentWillMount() {
    this.props.fetchTasks(this.props.schedule.uid);
    this.createDataSource(this.props.tasks);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.tasks);
  }
  createDataSource(tasks) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log("incdsoruce", tasks);
    console.log("ds", ds);

    this.dataSource = ds.cloneWithRows(tasks);
  }
  renderTaskRow (task) {
    const {removeTask, schedule} = this.props;
    return (<ListItem
              rowData = {task.title}
              rightData = {task.startTime}
              onRowPress = {() => {console.log('go to edit task');}}
              leftAction = {true}
              onActionPress = {() => {removeTask(schedule.uid, task.uid);}}
              actionText = "x"
            />);
  }
  render () {
    return (
      <View>
        <Header title={this.props.schedule.title} />
        <ListView
          enableEmptySections
          dataSource = {this.dataSource}
          renderRow = {this.renderTaskRow.bind(this)}
           >
      </ListView>
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

export default connect(mapState, {removeTask, fetchTasks})(SingleSchedule);
