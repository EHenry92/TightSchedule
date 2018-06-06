import _ from 'lodash';
import React, {Component} from 'react';
import {Text, ListView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, ListItem, Header} from './common';
import {removeSchedule, saveTemplate} from '../actions';
import colors from '../style/colors';
import ListComp from './ListComp';
import BasicWrappedList from './BasicWrappedList';

class ScheduleList extends Component {
  renderRow (schedule) {
    return (
      <ListItem
        style={{marginBottom: 10}}
        rowData = {schedule.title}
        rightData = {schedule.date}
        onRowPress = {() => {
          Actions.singleSchedule({schedule})
          }}
        onDelPress = {() => {this.props.removeSchedule(schedule.uid)}}
        delText = 'X'
        leftAction = 'true'
        onActionPress = {() => {this.props.saveTemplate(schedule)}}
        leftActionChild = {
        <Image
          style={{width: 40, height: 40}}
          source={require('./imgs/schedule.png')}
        />
        }
        leftActionStyle = {{backgroundColor: colors.transparent, borderWidth: 0}}
      />
    )
  }

  render () {
    return (
    <Card style={styles.schCardStyle}>
      <BasicWrappedList
        listTitle = 'Schedules'
        containerStyle = {styles.schCardStyle}
        renderRow = {this.renderRow.bind(this)}
      />
      </Card>

    );
  }
}
const withList = ListComp('Schedules',ScheduleList, compareSchedule);


const styles = {
  schCardStyle: {
    flex: 4,
    backgroundColor: colors.transparent
  }
}

const mapState = ({schedules}) => {
  const list = _.map(schedules.list, (val, uid) => {
    return {...val, uid}
  });;
  return {listData: list};
};

export default connect(mapState, {removeSchedule, saveTemplate})(withList);

function compareSchedule(a, b) {
  if (a.date && !b.date ) {return -1;}
  if (b.date && !a.date ) {return 1;}
  if (a.date < b.date) {return -1;}
  if (b.date < a.date) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}
