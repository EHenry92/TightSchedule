import _ from 'lodash';
import React, {Component} from 'react';
import {View, Text, ListView, AsyncStorage, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Button, PopUp, ListItem, Header} from './common';
import {fetchSchedules, removeSchedule, logout, saveTemplate, removeTemplate, templateToSchedule, stopScheduleListner} from '../actions';
import { unBordered, screenView,textureStyle } from '../style';
import colors from '../style/colors';
import ListComp from './ListComp';

class ScheduleList extends Component {
  componentWillMount() {
    this.props.fetchSchedules();
  }

  componentWillUnmount() {
    this.props.stopScheduleListner();
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
  }

  renderHeaderRow(text) {
    return(
      <Header viewStyle={styles.listHeaderStyle}>
        <Text>{text}</Text>
      </Header>
      )
  }

  render () {
    console.log("this is the slist props", this.props)
    const {schCardStyle, logoutBtnStyle, logoutContainerStyle} = styles;
    return (
  <View style={screenView}>
  <Image
    source={require('./imgs/concrete-texture.jpg')}
    resizeMode="cover"
    style={textureStyle}/>

    <Card style={schCardStyle}>
      <ListView
        enableEmptySections
        stickyHeaderIndices={[0]}
        renderHeader = {()=>this.renderHeaderRow('Schedules')}
        dataSource = {this.props.data}
        renderRow = {this.renderScheduleRow.bind(this)}>
      </ListView>
      </Card>


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

const withList = ListComp(ScheduleList, compareSchedule);


const styles = {
  schCardStyle: {
    flex: 4,
    backgroundColor: colors.transparent
  },
  tmpCardStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,33,115,0.2)',
    height: 30
  },
  listHeaderStyle: {
    marginTop: 0,
    paddingTop:0,
    height: 25,
    backgroundColor: 'rgba(0,33,115,0.2)',
    justifyContent: 'center'
  },
  logoutContainerStyle: {
    ...unBordered,
    bottom: 0,
    backgroundColor: colors.outlineColor,
    // padding: 0,
    margin: 0
  },
  logoutBtnStyle: {
  }
}

const mapState = (state) => {
  const schedules = _.map(state.schedules.list, (val, uid) => {
    return {...val, uid}
  });;
  return {listData: schedules};
};

export default connect(mapState, {
    fetchSchedules,
    removeSchedule,
    logout,
    saveTemplate,
    removeTemplate,
    templateToSchedule,
    stopScheduleListner
  })(withList);

function compareSchedule(a, b) {
  if (a.date && !b.date ) {return -1;}
  if (b.date && !a.date ) {return 1;}
  if (a.date < b.date) {return -1;}
  if (b.date < a.date) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}
