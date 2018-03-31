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
import {fetchTasks} from '../actions';
import _ from 'lodash';
import Row from './SRow'

const window = Dimensions.get('window');



class Basic extends Component {
  componentWillMount() {
    this.props.fetchTasks(this.props.schedule.uid);
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
    console.log("data", this.props.final)
    return (
      <View style={styles.container}>
          {this.props.schedule.title}
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={this.props.final}
          renderRow={this._renderRow}
          onChangeOrder = {(newOrder)=> {console.log(newOrder)}}
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
  const tasks = _.map(state.tasks, (val, uid) => {
    return {...val, uid};
  });
  let final = {};
  for (let i = 0; i< tasks.length ; i++) {
    final[i] = tasks[i];
  }
  return {final};
};
export default connect(mapState, {fetchTasks})(Basic);
