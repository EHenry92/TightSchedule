import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Spinner, Button} from './common';
import {saveSchedule, formChange, saveTemplate} from '../actions';
import DatePicker from 'react-native-datepicker';


class ScheduleForm extends Component {
  render () {
    const {title, date, loading, error, saveSchedule, formChange, saveTemplate} = this.props;
    return (
      <Card>
        <CardSection>
          <InputField
            label = 'Title'
            onChangeText = {(text) => {formChange({title: text}, true)}}
            value = {title}
            palceHolder = 'Schedule Name'
          />
        </CardSection>
        <CardSection>
        <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-01-01"
        maxDate="2019-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          },
          btnTextConfirm: {
            height: 20
         },
         btnTextCancel: {
            height: 20
         }

        }}
        onDateChange={(text) => {formChange({date: text}, true)}}
      />
        </CardSection>
        <CardSection>
          <Button onPress = {() => saveSchedule({title, date})}>
            Save
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapState = ({scheduleForm}) => {
  const {title, date, loading, error } = scheduleForm;
  return {title, date, loading, error };
};

export default connect(mapState, {saveSchedule, formChange, saveTemplate})(ScheduleForm);
