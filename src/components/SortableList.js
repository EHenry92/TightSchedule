import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {connect} from 'react-redux';
import {fetchTasks, getTaskCount} from '../actions';
import _ from 'lodash';
import Row from './SRow'
import {Header} from './common';
const window = Dimensions.get('window');



class Basic extends Component {
  componentWillMount() {
    this.props.fetchTasks(this.props.schedule.uid);
    this.props.getTaskCount(this.props.schedule.uid);

  }

  _renderRow = ({data, active}) => {
    const {schedule} = this.props;
    return <Row
      // data={data}
      task = {data}
      active={active}
      sId = {schedule.uid}
      />
  }
  render() {

    return (
      <View style={styles.container}>
        <SortableList
          renderHeader = {() =>
            <Header>
              <Text style={{fontSize: 20}}>{this.props.schedule.title}</Text>
            </Header>
          }
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.props.final}
          renderRow={this._renderRow}
          onChangeOrder = {newOrder=> {console.log(newOrder)}}
          />
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
  return {final};
};
export default connect(mapState, {fetchTasks, getTaskCount})(Basic);
