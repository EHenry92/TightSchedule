import _ from 'lodash';
import React, {Component} from 'react';
import {Text, ListView, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Card, ListItem, Header} from './common';
import {fetchSchedules, removeSchedule, logout, saveTemplate, removeTemplate, templateToSchedule, stopScheduleListner} from '../actions';import colors from '../style/colors';
import ListComp from './ListComp';

class TemplateleList extends Component {
  renderRow (template) {
    return <ListItem
            style={{marginBottom: 2}}
            rowData = {template.title}
            rightData = {template.date}
            onDelPress = {() => {this.props.removeTemplate(template.uid)}}
            delText = 'X'
            leftAction = 'true'
            onActionPress = {() => {this.props.templateToSchedule(template)}}
            leftActionChild = {
              <Image
                style={{width: 40, height: 40}}
                source={require('./imgs/blankschedule.png')}
              />
              }
            leftActionStyle = {{backgroundColor: colors.transparent, borderWidth: 0}}
          />
  }

  render () {
    return (
      <Card style={styles.tmpCardStyle}>
      <ListView
        enableEmptySections
        renderHeader = {()=>
          <Header viewStyle={styles.listHeaderStyle}>
            <Text>Templates</Text>
          </Header>
        }
        stickyHeaderIndices={[0]}
        dataSource = {this.tempSource}
        renderRow = {this.renderRow.bind(this)}>
      </ListView>
    </Card>

    );
  }
}

const withList = ListComp(TemplateleList)

const styles = {
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
  }
}

const mapState = (schedules) => {
  const templates = _.map(schedules.temps, (val, uid) => {
    return {...val, uid}
  });
  return {listData:templates};
};

export default connect(mapState, {
    removeTemplate,
    templateToSchedule,
  })(withList);
