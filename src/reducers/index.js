import {combineReducers} from 'redux';
import auth from './auth';
import scheduleForm from './scheduleForm';
import taskForm from './taskForm';
import schedules from './schedules';
import tasks from './tasks';

export default combineReducers({
  auth, schedules, taskForm, scheduleForm, tasks
});

export * from './auth';
export * from './scheduleForm';
export * from './taskForm';
export * from './schedules';
export * from './tasks';
