import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Spinner, Button} from './common';
import {submitForm, formChange, saveTemplate} from '../actions';
import DatePicker from 'react-native-datepicker';


const ScheduleForm = (props) => {
    const currDate = new Date();
    const minDate =  currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate();
    const maxDate = (currDate.getFullYear() + 1) + '-' + currDate.getMonth() + '-' + currDate.getDate();
    const {title, date, loading, error, submitForm, formChange, saveTemplate} = props;

    return (
      <Card>
        <CardSection>
          <InputField
            label = "Title"
            onChangeText = {(text) => {formChange({title: text});}}
            value = {title}
            palceHolder = "Schedule Name"
          />
        </CardSection>
        <CardSection>
        <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate= {minDate}
        maxDate= {maxDate}
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
        onDateChange={(text) => {formChange({date: text});}}
      />
        </CardSection>
        <CardSection>
          {
            loading ?
            <Spinner size="large" />
            :
            <Button onPress = {() =>
            submitForm({title, date})}>
              Save
            </Button>
          }
        </CardSection>
      </Card>
    );
};

const mapState = ({scheduleForm}) => {
  const {title, date, loading, error } = scheduleForm;
  return {title, date, loading, error };
};

export default connect(mapState, {submitForm, formChange, saveTemplate})(ScheduleForm);
