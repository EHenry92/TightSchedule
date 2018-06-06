import React, { Component } from 'react';
import {Animated, Easing, StyleSheet, Text, Image, View, Dimensions, Button, Platform, TouchableHighlight, AsyncStorage, ListView} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {connect} from 'react-redux';
import {pushNotifications} from '../services';
import {fetchTasks, getTaskCount, changeTask} from '../actions';
import _ from 'lodash';
import Row from './SRow'
import {Header, Card, ListItem} from './common';
import colors from '../style/colors';
import {textureStyle} from '../style';
import CompletedTasks from './WrappedCompletedTasks';
const window = Dimensions.get('window');





class Basic extends Component {
  constructor () {
    super();
    this.state = {showSave: false, order:[]};
  }
  componentWillMount() {
    this.props.fetchTasks(this.props.inputData.uid);
    this.props.getTaskCount(this.props.inputData.uid);
  }
  renderRow = ({data, active}) => {
    const {inputData} = this.props;
    return <Row
      task = {data}
      active={active}
      sId = {inputData.uid}
      />
  }

  saveOrder() {
    this.setState({showSave:false})
    let {final, changeTask, inputData} = this.props;
    let {order} = this.state;
    for (let pos= 0; pos< order.length; pos++) {
      const oldPosition = parseInt(order[pos]);
      const newPosition = pos;
      if (newPosition !== oldPosition) {
        this.props.changeTask(inputData.uid, final[oldPosition].uid, {pos: newPosition});
      }
    }
  }

  changePosition(newOrder) {
    const order = newOrder;
    this.setState({order, showSave: true});
  }

  startSchedule() {
    const {inputData, final} = this.props;
    //store schedule and tasks in local storage for continued access
    AsyncStorage.setItem('TightSchedule-schedule',
      JSON.stringify({schedule:inputData, tasks: final, ptr: 0}),
      () => {}
    );
    pushNotifications.localNotification({
      title: `${inputData.title}`,
      message: `Ready to start ${inputData.title} Schedule ?`,
      bigText: 'Click Start to begin and Cancel to stop schedule.',
      actions: '["Start", "Cancel"]',
      vibrate: true
    });
}

  render() {
    return (
      <View style={styles.container}>
      <Image
        source={require('./imgs/concrete-texture.jpg')}
        style={textureStyle}
        resizeMode="cover"
      />
        <SortableList
          renderHeader = {() =>
            <Header>
              <TouchableHighlight
                style = {{paddingLeft:7, paddingBottom: 10, flex: 2}}
                onPress={this.startSchedule.bind(this)}>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('./imgs/startBtn.png')}
                />
              </TouchableHighlight>
              <Text style={{fontSize: 25,flex: 8}}>
                {this.props.inputData.title}
              </Text>
            </Header>
          }
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.props.final}
          renderRow={this.renderRow}
          onChangeOrder = {this.changePosition.bind(this)}
          />
          <CompletedTasks />
      {this.state.showSave &&
      <Button
        style={{height: 60, width: 60}}
        onPress={this.saveOrder.bind(this)}
        title='Save Order' />
      }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.highlightColor,
    ...Platform.select({
      ios: {
        // paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: colors.textColor,
  },

  list: {
    flex: 5,
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

const mapState = ({tasks}) => {
  const taskList = _.map(tasks.tasks, (val, uid) => {
    return {...val, uid};
  });
  let final = {};
  for (let i = 0; i< taskList.length ; i++) {
    let theTask = taskList[i];
    final[theTask.pos] = theTask;
  }
  return {final, tCount: taskList.length};
};
export default connect(mapState, {fetchTasks, getTaskCount, changeTask})(Basic);
