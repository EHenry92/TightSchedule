import React from 'react';
import LoginForm from './components/LoginForm';
import ScheduleForm from './components/ScheduleForm';
import TaskForm from './components/TaskForm';
import SingleSchedule from './components/SingleSchedule';
import {Scene, Router, Actions} from 'react-native-router-flux';
import colors from './style/colors';
import ListOfSchedules from './components/ListOfSchedules';

const RouterComponent = () => {
  return (
    <Router navigationBarStyle={styles.navBar} >
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
            key= "login"
            component={LoginForm}
            title="Tight Schedule"
            initial
            />
        </Scene>
        <Scene key="main">
          <Scene
            key="scheduleList"
            component={ListOfSchedules}
            title="Tight Schedule"
            rightTitle = "+New"
            onRight={() => Actions.scheduleForm()}
            />
          <Scene
            key="scheduleForm"
            component={ScheduleForm}
            title="New Schedule"
            />
          <Scene
            key="singleSchedule"
            component={SingleSchedule}
            title="Tight Schedule"
            rightTitle = "+Task"
            onRight = {(evt) => {
              Actions.taskForm({schedule: evt.inputData});}}
            />
          <Scene
            key="taskForm"
            component={TaskForm}
            title="New Task"
            />

        </Scene>
      </Scene>
    </Router>
  );
};
export default RouterComponent;

const styles = {
  navBar: {
    backgroundColor: colors.outlineColor
  }
}
