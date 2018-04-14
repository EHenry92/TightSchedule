import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, PopUp, ListItem} from './common';
import {fetchSchedules, removeSchedule, logout} from '../actions';
import {pushNotifications} from '../services';
import { unBordered, screenView,textureStyle } from '../style';
// import Logout from './Logout';

class ScheduleList extends Component {
  componentWillMount() {
    this.props.fetchSchedules();
    this.createDataSource(this.props.schedules.sort(compareSchedule));
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.schedules.sort(compareSchedule));
  }
  createDataSource(schedules) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(schedules)
  }
  renderScheduleRow (schedule) {
    return <ListItem
            style={{marginBottom: 10}}
            rowData = {schedule.title}
            rightData = {schedule.date}
            onRowPress = {() => {
              Actions.singleSchedule({schedule})
              }}
            onDelPress = {() => {this.props.removeSchedule(schedule.uid)}}
            delText = 'X'
          />
  }

  render () {
    return (
  <View style={screenView}>
  <Image
    source={require('./imgs/concrete-texture.jpg')}
    resizeMode="cover"
    style={textureStyle}/>

      <ListView
        enableEmptySections
        dataSource = {this.dataSource}
        renderRow = {this.renderScheduleRow.bind(this)}>
      </ListView>
    <View style={[unBordered, {bottom: 0, position: 'absolute'}]}>
      <Button onPress={() => this.props.logout()}>
        Logout
      </Button>
    </View>
  </View>
    );
  }
}

const mapState = (state) => {
  const schedules = _.map(state.schedules, (val, uid) => {
    return {...val, uid}
  });
  return {schedules};
};

export default connect(mapState, {fetchSchedules, removeSchedule, logout})(ScheduleList);

function compareSchedule(a, b) {
  if (a.date && !b.date ) {return -1;}
  if (b.date && !a.date ) {return 1;}
  if (a.date < b.date) {return -1;}
  if (b.date < a.date) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}
