import React, { Component } from 'react';
import {ListView, Image} from 'react-native';
import {connect} from 'react-redux';
import {fetchTasks, getTaskCount, changeTask} from '../actions';
import _ from 'lodash';
import {Header, Card, ListItem} from './common';
import colors from '../style/colors';
import {textureStyle} from '../style';
import ListComp from './ListComp';


class CompletedTasks extends Component {
  renderRow (task) {
    return <ListItem
    style={{marginBottom: 2}}
    rowData = {task.title}
    leftAction = 'true'
    onActionPress = {() => {}}
    textStyle = {{textDecorationLine: 'line-through'}}
    leftActionChild = {
    <Image
      style={{width: 40, height: 40}}
      source={require('./imgs/tt2.png')}
    />
    }
    leftActionStyle = {{backgroundColor: colors.transparent, borderWidth: 0}}
  />
  }

  render() {
    return (
          <ListView
            enableEmptySections
            style = {{flex: 1, borderWidth: 2, borderColor: 'black'}}
            // stickyHeaderIndices={[0]}
            // renderHeader = {()=>
            //   <View style={{alignItems: 'center'}}>
            //     <Text>Completed Tasks</Text>
            //   </View>}
            dataSource = {this.props.data}
            renderRow = {this.renderRow.bind(this)}
            >
          </ListView>
    );
  }
}


const mapState = (state) => {
  const complete = _.map(state.tasks.complete, (val, uid) => {
    return {...val, uid};
  });
  return {listData: complete};
};
export default connect(mapState, {fetchTasks, getTaskCount, changeTask})(ListComp(null,CompletedTasks));

