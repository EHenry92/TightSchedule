import {
SCHEDULE_FORM_EDIT, SCHEDULE_FORM_CLEAR, SCHEDULE_FORM_LOADING, CREATE_SCHEDULE,
TASK_FORM_EDIT, TASK_FORM_CLEAR, TASK_FORM_LOADING, ADD_TASK
} from './types';
import firebase from 'firebase';
// import {saveSchedule} from './schedule';
import {createTask} from './tasks';
import {Actions} from 'react-native-router-flux';

export const scheduleFormEdit = change => ({type: SCHEDULE_FORM_EDIT, change});
export const scheduleFormClear = () => ({type: SCHEDULE_FORM_CLEAR});
export const scheduleFormLoad = () => ({type: SCHEDULE_FORM_LOADING});
export const createSchedule = () => ({type: CREATE_SCHEDULE});


export const taskFormEdit = change => ({type: TASK_FORM_EDIT, change});
export const taskFormClear = () => ({type: TASK_FORM_CLEAR});
export const taskFormLoad = () => ({type: TASK_FORM_LOADING});
export const addTask = () => ({type: ADD_TASK});


export const formChange = (change, scheduleForm = true) => dispatch => {
    scheduleForm ? dispatch(scheduleFormEdit(change)) : dispatch(taskFormEdit(change));
};

export const formClear = (scheduleForm = true) => dispatch => {
  scheduleForm ? dispatch(scheduleFormClear()) : dispatch(taskFormClear());
};

export const submitForm = (data, scheduleForm = true, schedule) => dispatch => {
  const {currentUser} = firebase.auth();
  if (scheduleForm) {
    dispatch(scheduleFormLoad());
    firebase.database().ref(`/users/${currentUser.uid}/schedules`)
    .push(data)
    .then(() => {
      dispatch(createSchedule());
      dispatch(scheduleFormClear());
      Actions.scheduleList();
    });
  }
  else {
    dispatch(taskFormLoad());
    firebase.database().ref(`/users/${currentUser.uid}/schedules/${schedule.uid}/tasks`)
    .push(data)
    .then(() => {
      dispatch(addTask());
      dispatch(taskFormClear());
      Actions.pop();
    });
  }
};
