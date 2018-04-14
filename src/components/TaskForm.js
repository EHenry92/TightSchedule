import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Picker, Text, View, TouchableWithoutFeedback} from 'react-native';
import _ from 'lodash';
import {Card, CardSection, InputField, Spinner, Button, PopUp, Header} from './common';
import {submitForm, formChange, saveTemplate} from '../actions';


class TaskForm extends Component {
    constructor () {
      super();
      this.state = {
        pickDur: false,
        minIntervals : _.range(5, 60, 5),
        hrIntervals : _.range(0, 24, 1)
      };
    }


    render (){
      const {title, durationMin, durationHr, startTime, loading, submitForm, formChange, schedule, taskCount} = this.props;

      const {lableTextStyle, pickerContainerStyle} = styles;
      return (
        <Card>
          <Header>
            <Text>
              {schedule.title}
            </Text>
          </Header>
          <CardSection>
            <InputField
              label = "Title"
              onChangeText = {(text) => {formChange({title: text}, false);}}
              value = {title}
              palceHolder = "Task Name"
            />
          </CardSection>
          <CardSection>
            <Text style = {lableTextStyle}>Duration:</Text>
              <View>
                <Text style={lableTextStyle}>{durationHr} hrs {durationMin} min</Text>
              </View>
          </CardSection>
          <CardSection>
          <View style = {pickerContainerStyle}>
            <Text>Hours</Text>
            <Picker
              style={{width: 100, height: 132}} itemStyle={{height: 132}}
              selectedValue={durationHr}
              onValueChange={(itemValue) => formChange({durationHr: itemValue}, false)}>
              {
                this.state.hrIntervals.map(amt =>
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
                this.state.minIntervals.map(amt =>
                  <Picker.Item key={amt} label={amt.toString()} value= {amt} />
                )
              }
            </Picker>
          </View>
          </CardSection>
          <CardSection>
            {
              loading ?
              <Spinner size="large" />
              :
              <Button onPress = {() =>
              submitForm({title, durationHr, durationMin, pos: taskCount}, false, schedule)}>
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
  },
  pickerContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 40
  }
};
const mapState = (state) => {
  const {title, description, duration, durationMin, durationHr, startTime, loading, error } = state.taskForm;
  const taskCount = state.tasks.taskCount || 0;
  return {title, description, duration, durationMin, durationHr,  startTime, loading, error,taskCount};
};

export default connect(mapState, {submitForm, formChange})(TaskForm);
