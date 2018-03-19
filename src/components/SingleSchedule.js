import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import {connect} from 'react-redux';
import { ListItem, Header} from './common';
import {removeTask} from '../actions';

class SingleSchedule extends Component {
  componentWillMount() {
    this.createDataSource(this.props.schedule.tasks);
  }
  componentWillReceiveProps(newProps) {
    this.createDataSource(newProps.schedule.tasks);
  }
  createDataSource(tasks) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(tasks);
  }
  renderTaskRow (task) {
    return (<ListItem
              rowData = {task.title}
              rightData = {task.startTime}
              onRowPress = {() => {console.log('go to edit task');}}
              leftAction = {true}
              onActionPress = {() => {this.props.removeTask(this.props.schedule.uid, task.uid);}}
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


export default connect(null, {removeTask})(SingleSchedule);
