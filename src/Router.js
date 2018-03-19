import React from 'react';
import LoginForm from './components/LoginForm';
import ScheduleList from './components/ScheduleList';
import ScheduleForm from './components/ScheduleForm';
import TaskForm from './components/TaskForm';
import SingleSchedule from './components/SingleSchedule';
import {Scene, Router, Actions} from 'react-native-router-flux';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene
            key= "login"
            component={LoginForm}
            title="Please Login or Signup"
            initial
            />
        </Scene>
        <Scene key="main">
          <Scene
            key="scheduleList"
            component={ScheduleList}
            title="Schedule List"
            rightTitle = "Create New"
            onRight={() => Actions.scheduleForm()}
            />
          <Scene
            key="scheduleForm"
            component={ScheduleForm}
            title="New Schedule"
            />
          <Scene
            key="taskForm"
            component={TaskForm}
            title="New Task"
            />
            <Scene
            key="singleSchedule"
            component={SingleSchedule}
            title="Schedule Details"
            />
        </Scene>
      </Scene>
    </Router>
  )
}
export default RouterComponent;
