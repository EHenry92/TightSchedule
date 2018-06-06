import _ from 'lodash';
import React, {Component} from 'react';
import {Text, ListView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, ListItem, Header} from './common';
import {removeSchedule, saveTemplate} from '../actions';
import colors from '../style/colors';
import ListComp from './ListComp';

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
      <ListView
        enableEmptySections
        stickyHeaderIndices={[0]}
        renderHeader = {()=>
          <Header viewStyle={styles.listHeaderStyle}>
            <Text>{'Schedules'}</Text>
          </Header>
        }
        dataSource = {this.props.data}
        renderRow = {this.renderRow.bind(this)}>
      </ListView>
      </Card>

    );
  }
}
const withList = ListComp(ScheduleList, compareSchedule);


const styles = {
  schCardStyle: {
    flex: 4,
    backgroundColor: colors.transparent
  },
  listHeaderStyle: {
    marginTop: 0,
    paddingTop:0,
    height: 25,
    backgroundColor: 'rgba(0,33,115,0.2)',
    justifyContent: 'center'
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
