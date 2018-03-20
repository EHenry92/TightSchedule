import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker, Text} from 'react-native';
import _ from 'lodash';
import {Card, CardSection, InputField, Spinner, Button} from './common';
import {submitForm, formChange, saveTemplate} from '../actions';
import DatePicker from 'react-native-datepicker';


const TaskForm = (props) => {
    const currTime = new Date().getTime;
    const {title, description, duration, durationMin, durationHr, startTime, loading, error, submitForm, formChange, schedule } = props;
    const {lableTextStyle, pickerStyle} = styles;
    const minIntervals = _.range(5, 60, 5);
    const hrIntervals = _.range(0, 24, 1);


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
          <Text style = {lableTextStyle}> Start Time: </Text>
          <DatePicker
            style={{width: 200}}
            date={startTime}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={10}
            onDateChange={(time) => {formChange({startTime: time}, false);}}
            customStyles={{
              btnTextConfirm: {
                height: 20
             },
             btnTextCancel: {
                height: 20
             }
            }}
          />
        </CardSection>
        <CardSection>
        <Text style = {lableTextStyle}> Duration: </Text>
          <DatePicker
            style={{width: 150}}
            date={duration}
            mode="time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            minuteInterval={5}
            onDateChange={(time) => {formChange({duration: time}, false);}}
            customStyles={{
              btnTextConfirm: {
                height: 20
             },
             btnTextCancel: {
                height: 20
             }
            }}
          />
        </CardSection>
        {/* <CardSection>
          <Text style = {lableTextStyle}> Duration: </Text>
          <Text> {durationHr} : {durationMin} </Text>
          <Picker
            style = {pickerStyle}
            selectedValue={durationHr}
            onValueChange={(itemValue) => formChange({durationHr: itemValue}, false)}
            >
            {
              hrIntervals.map(amt =>
                <Picker.Item key={amt} label={amt.toString()} value= {amt} />
              )
            }
          </Picker>
          <Picker
            style = {pickerStyle}
            selectedValue={durationMin}
            onValueChange={(itemValue) => formChange({durationMin: itemValue}, false)}
            >
            {
              minIntervals.map(amt =>
                <Picker.Item key={amt} label={amt.toString()} value= {amt} />
              )
            }
          </Picker>
        </CardSection> */}
        <CardSection>
          {
            loading ?
            <Spinner size='large'/>
            :
            <Button onPress = {() =>
            submitForm({title, startTime, duration}, false, schedule)}>
              Save
            </Button>
          }
        </CardSection>
      </Card>
    );
};

const styles = {
  pickerStyle: {
    width: 30
  },
  lableTextStyle: {
    fontSize: 20
  }
}
const mapState = (state) => {
  const {title, description, duration, durationMin, durationHr, startTime, loading, error } = state.taskForm;
  return {title, description, duration, durationMin, durationHr,  startTime, loading, error };
};

export default connect(mapState, {submitForm, formChange})(TaskForm);
