import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker, Text, View, TouchableWithoutFeedback} from 'react-native';
import _ from 'lodash';
import {Card, CardSection, InputField, Spinner, Button, PopUp} from './common';
import {submitForm, formChange, saveTemplate} from '../actions';
import DatePicker from 'react-native-datepicker';


class TaskForm extends Component {
    constructor () {
      super();
      this.state = {
        pickDur: false
      };
      this.showPopUp = this.showPopUp.bind(this);
    }
    showPopUp() {
      const {durationMin, durationHr, formChange} = this.props;
      const minIntervals = _.range(5, 60, 5);
      const hrIntervals = _.range(0, 24, 1);
      return (
        <View style = {{flexDirection: 'row'}}>
        <Text>Hours</Text>
            <Picker
              style={{width: 100, height: 132}} itemStyle={{height: 132}}
              selectedValue={durationHr}
              onValueChange={(itemValue) => formChange({durationHr: itemValue}, false)}
              >
              {
                hrIntervals.map(amt =>
                  <Picker.Item key={amt} label={amt.toString()} value= {amt} />
                )
              }
            </Picker>
            <Text>Minutes</Text>
            <Picker
              style={{width: 100, height: 132}} itemStyle={{height: 132}}
              selectedValue={durationMin}
              onValueChange={(itemValue) => formChange({durationMin: itemValue}, false)}
              >
              {
                minIntervals.map(amt =>
                  <Picker.Item key={amt} label={amt.toString()} value= {amt} />
                )
              }
            </Picker>
          </View>
      );
    }

    render (){
      const {title, durationMin, durationHr, startTime, loading, submitForm, formChange, schedule} = this.props;
      const {lableTextStyle} = styles;
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
            <TouchableWithoutFeedback
              onPress = {() => {this.setState({pickDur: true});}}
              >
              <View>
                <Text style={lableTextStyle}> {durationHr} hrs {durationMin} min </Text>
              </View>
            </TouchableWithoutFeedback>
            <PopUp
              visible = {this.state.pickDur}
              onAccept = {() => {this.setState({pickDur: false});}}
            >
              {this.showPopUp()}
            </PopUp>
          </CardSection>
          <CardSection>
            {
              loading ?
              <Spinner size="large" />
              :
              <Button onPress = {() =>
              submitForm({title, startTime, durationHr, durationMin}, false, schedule)}>
                Save
              </Button>
            }
          </CardSection>
        </Card>
      );
    }

}

const styles = {
  pickerStyle: {
    width: 30
  },
  lableTextStyle: {
    fontSize: 20
  }
};
const mapState = (state) => {
  const {title, description, duration, durationMin, durationHr, startTime, loading, error } = state.taskForm;
  return {title, description, duration, durationMin, durationHr,  startTime, loading, error};
};

export default connect(mapState, {submitForm, formChange})(TaskForm);
