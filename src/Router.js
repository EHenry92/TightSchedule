import React from 'react';
import LoginForm from './components/LoginForm';
import ScheduleList from './components/ScheduleList';
import ScheduleForm from './components/ScheduleForm';
import {Scene, Router} from 'react-native-router-flux';

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
            rightTitle = "Create New"
            onRight={() => Actions.scheduleForm()}
            key="scheduleList"
            component={ScheduleList}
            title="Schedule List"
            />
             <Scene
            rightTitle = "Add Task"
            // onRight={() => Actions.scheduleForm();}
            key="scheduleForm"
            component={ScheduleForm}
            title="New Schedule"
            />
        </Scene>
      </Scene>
    </Router>
  )
}
export default RouterComponent;
