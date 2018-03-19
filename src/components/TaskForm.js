import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardSection, InputField, Spinner, Button} from './common';
import {submitForm, formChange, saveTemplate} from '../actions';
import DatePicker from 'react-native-datepicker';


const TaskForm = (props) => {
    const currTime = new Date().getTime;
    const {title, description, duration, startTime, loading, error, submitForm, formChange } = props;

    return (
      <Card>
        <CardSection>
          <InputField
            label = "Title"
            onChangeText = {(text) => {formChange({title: text}, false);}}
            value = {title}
            palceHolder = "Task Name"
          />
        </CardSection>
        <CardSection>

          <DatePicker
            style={{width: 200}}
            date={startTime}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => {formChange({startTime: time}, false);}}
          />
        </CardSection>
        <CardSection>
          {
            loading ?
            <Spinner size='large'/>
            :
            <Button onPress = {() =>
            submitForm({title, startTime}, false, props.schedule.uid)}>
              Save
            </Button>
          }
        </CardSection>
      </Card>
    );
};

const mapState = (state) => {
  const {title, description, duration, startTime, loading, error } = state.taskForm;
  return {title, description, duration, startTime, loading, error };
};

export default connect(mapState, {submitForm, formChange})(TaskForm);
