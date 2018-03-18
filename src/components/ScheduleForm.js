import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, CardSection, InputField, Spinner, Button} from './common';
import {saveSchedule, removeSchedule, changeSchedule, saveTemplate} from '../actions/schedule';

class ScheduleForm extends Component {
  render () {
    return (
      <Card>
        <CardSection>
        </CardSection>
      </Card>
    );
  }
}

export default ScheduleForm;
