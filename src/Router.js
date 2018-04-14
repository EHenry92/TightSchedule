import React from 'react';
import LoginForm from './components/LoginForm';
import ScheduleList from './components/ScheduleList';
import ScheduleForm from './components/ScheduleForm';
import TaskForm from './components/TaskForm';
import SingleSchedule from './components/SingleSchedule';
import {Scene, Router, Actions} from 'react-native-router-flux';
import colors from './style/colors';

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
            component={ScheduleList}
            title="Schedule List"
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
            title="Schedule Details"
            rightTitle = "+New"
            onRight = {(evt) => {
              Actions.taskForm({schedule: evt.schedule});}}
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
