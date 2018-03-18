import {combineReducers} from 'redux';
import auth from './auth';
import scheduleForm from './scheduleForm';
import taskFrom from './taskForm';
import schedules from './schedules';

export default combineReducers({
  auth, schedules, taskFrom, scheduleForm
});
