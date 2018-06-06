import _ from 'lodash';
import React, {Component} from 'react';
import {Text, ListView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, ListItem, Header} from './common';
import {fetchSchedules, removeSchedule, logout, saveTemplate, removeTemplate, templateToSchedule, stopScheduleListner} from '../actions';
import colors from '../style/colors';
import ListComp from './ListComp';

class ScheduleList extends Component {
    renderRow (inputData) {
      const titleSchedule = 'Schedule';
      const {listTitle} = this.props;
      return (
      <ListItem
        style={{marginBottom:10}}
        rowData = {inputData.title}
        rightData = {inputData.date}
        onRowPress = {() => {
          listTitle == titleSchedule &&
          Actions.singleSchedule({inputData})
          }}
        onDelPress = {() => {
          listTitle == titleSchedule ?
            this.props.removeSchedule(inputData.uid)
            :
            this.props.removeTemplate(inputData.uid)
          }}
        delText = 'X'
        leftAction = 'true'
        onActionPress = {() => {
            listTitle == titleSchedule ?
              this.props.saveTemplate(inputData)
              :
              this.props.templateToSchedule(inputData)
            }}
        leftActionChild = {
        <Image
          style={{width: 40, height: 40}}
          source={listTitle== titleSchedule ?
            require('./imgs/schedule.png')
            :
            require('./imgs/blankschedule.png') }
        />
        }
        leftActionStyle = {{backgroundColor: colors.transparent, borderWidth: 0}}
      />
    );

    }
    render () {
      const {listTitle} = this.props;
      return (
        <Card style={listTitle== 'Schedules' ? styles.schCardStyle : styles.tmpCardStyle}>
          <ListView
            enableEmptySections
            stickyHeaderIndices={[0]}
            renderHeader = {() => (
                <Header viewStyle={styles.listHeaderStyle}>
                  <Text>{listTitle}</Text>
                </Header>
            )}
            dataSource = {this.props.data}
            renderRow = {this.renderRow.bind(this)}>
          </ListView>
        </Card>
    );}
}

function compareSchedule(a, b) {
  if (a.date && !b.date ) {return -1;}
  if (b.date && !a.date ) {return 1;}
  if (a.date < b.date) {return -1;}
  if (b.date < a.date) {return 1;}
  if (a.title < b.title) {return -1;}
  if (b.title < a.title) {return 1;}
  return 0;
}

const styles = {
  listHeaderStyle: {
    marginTop: 0,
    paddingTop:0,
    height: 25,
    backgroundColor: 'rgba(0,33,115,0.2)',
    justifyContent: 'center'
  },
  tmpCardStyle: {
    flex: 1,
    backgroundColor: 'rgba(0,33,115,0.2)',
    height: 30
  },
  schCardStyle: {
    flex: 4,
    backgroundColor: colors.transparent
  }
}

const mapStateT = ({schedules}) => {
  const templates = _.map(schedules.temps, (val, uid) => {
    return {...val, uid}
  });
  return {listData:templates};
};

const mapStateS = ({schedules}) => {
  const list = _.map(schedules.list, (val, uid) => {
    return {...val, uid}
  });;
  return {listData: list};
};
export const SchedulesWithList = connect(mapStateS, {
    removeTemplate,
    templateToSchedule,
  })(ListComp('Schedules',BasicList, compareSchedule));

export const TemplateList = connect(mapStateT, {
  removeSchedule, saveTemplate
  })(ListComp('Templates',BasicList, compareSchedule));
