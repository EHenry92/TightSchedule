import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, PopUp, ListItem, Header} from './common';
import {fetchSchedules, removeSchedule, logout, saveTemplate, removeTemplate, templateToSchedule, stopScheduleListner} from '../actions';
import {unBordered, screenView,textureStyle } from '../style';
import colors from '../style/colors';
import {SchedulesWithList, TemplateList} from './WrappedScheduleList';

class ScheduleList extends Component {
  componentDidMount() {
    this.props.fetchSchedules();
  }

  componentWillUnmount() {
    this.props.stopScheduleListner();
  }

  render () {
    const {schCardStyle, tmpCardStyle,logoutBtnStyle, logoutContainerStyle} = styles;
    return (
  <View style={screenView}>
  <Image
    source={require('./imgs/concrete-texture.jpg')}
    resizeMode="cover"
    style={textureStyle}/>

    <SchedulesWithList />
    <TemplateList />

    <View style={logoutContainerStyle}>
      <Button
        styleButton={logoutBtnStyle}
        onPress={() =>
        this.props.logout()
        }>
        Logout
      </Button>
    </View>
  </View>
    );
  }
}

const styles = {
  logoutContainerStyle: {
    ...unBordered,
    bottom: 0,
    backgroundColor: colors.outlineColor,
    margin: 0
  },
  logoutBtnStyle: {
  }
}
const mapState = ({schedules}) => {
  return schedules;
};

export default connect(mapState, {
    fetchSchedules,
    logout,
    stopScheduleListner
  })(ScheduleList);


