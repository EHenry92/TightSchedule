import React, { Component } from 'react';
import {Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Button, Platform, TouchableHighlight, AsyncStorage} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {connect} from 'react-redux';
import {pushNotifications} from '../services';
import {fetchTasks, getTaskCount, changeTask} from '../actions';
import _ from 'lodash';
import Row from './SRow'
import Timer from './Timer'
import {Header} from './common';
const window = Dimensions.get('window');




class Basic extends Component {
  constructor () {
    super();
    this.state = {showSave: false, order:[]};
  }
  componentWillMount() {
    this.props.fetchTasks(this.props.schedule.uid);
    this.props.getTaskCount(this.props.schedule.uid);
  }

  renderRow = ({data, active}) => {
    const {schedule} = this.props;
    return <Row
      task = {data}
      active={active}
      sId = {schedule.uid}
      />
  }

  saveOrder() {
    this.setState({showSave:false})
    let {final, changeTask, schedule} = this.props;
    let {order} = this.state
    for (let pos= 0; pos< order.length; pos++) {
      let oldPosition = parseInt(order[pos]);
      if (pos !== oldPosition) {
        this.props.changeTask(schedule.uid, final[oldPosition].uid, {pos});
        this.props.changeTask(schedule.uid, final[pos].uid, {pos: oldPosition});
      }
    }
  }

  changePosition(newOrder) {
    const order = newOrder;
    this.setState({order, showSave: true});
  }

  startSchedule() {
    const {schedule, final} = this.props;
    //store schedule and tasks in local storage for continued access
    AsyncStorage.setItem('TightSchedule-schedule',
      JSON.stringify({schedule:schedule, tasks: final, ptr: 0}),
      () => {}
    );
    pushNotifications.localNotification({
      title: `${schedule.title}`,
      message: `Ready to start ${schedule.title} Schedule ?`,
      bigText: 'Click Start to begin and Cancel to stop schedule.',
      actions: '["Start", "Cancel"]'
    });
    //Set data in local notification
}

  render() {
    return (
      <View style={styles.container}>
        <SortableList
          renderHeader = {() =>
            <View>
              <TouchableHighlight
                style = {{flex: 1, padding: 7}}
                onPress={this.startSchedule.bind(this)}>
                <Text>
                  Start
                </Text>
              </TouchableHighlight>
              <Text style={{fontSize: 20, flex: 6, textAlign: 'center'}}>
                {this.props.schedule.title}
              </Text>
            </View>
          }
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.props.final}
          renderRow={this.renderRow}
          onChangeOrder = {this.changePosition.bind(this)}
          />
      {this.state.showSave &&
      <Button
        style={{height: 60, width: 60}}
        onPress={this.saveOrder.bind(this)}
        title='SaveOrder' />
      }
      </View>
    );
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
  },

  list: {
    flex: 1,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      }
    })
  }

});

const mapState = (state) => {
  const tasks = _.map(state.tasks.tasks, (val, uid) => {
    return {...val, uid};
  });
  let final = {};
  for (let i = 0; i< tasks.length ; i++) {
    let theTask = tasks[i];
    final[theTask.pos] = theTask;
  }

  return {final, tCount: tasks.length};
};
export default connect(mapState, {fetchTasks, getTaskCount, changeTask})(Basic);
