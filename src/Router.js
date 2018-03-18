import React from 'react';
import LoginForm from './components/LoginForm';
import ScheduleList from './components/ScheduleList';
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
            // rightTitle = ""
            // onRight={}
            key="scheduleList"
            component={ScheduleList}
            title="Schedule List"
            initial
            />
        </Scene>
      </Scene>
    </Router>
  )
}
export default RouterComponent;
