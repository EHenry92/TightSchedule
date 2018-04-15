import firebase from 'firebase';
import {GET_SCHEDULES, CREATE_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, CREATE_TEMPLATE} from './types';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

export const getSchedules = schedules => ({type: GET_SCHEDULES, schedules});
// export const createSchedule = () => ({type: CREATE_SCHEDULE});
export const deleteSchedule = () => ({type: DELETE_SCHEDULE});
export const editSchedule = () => ({type: EDIT_SCHEDULE});
export const createTemplate = () => ({type: CREATE_TEMPLATE});

export const fetchSchedules = () => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules`)
  .on('value', snapshot => {
    let schedules = snapshot.val();
    AsyncStorage.mergeItem('TightSchedule', JSON.stringify({schedules}), () => {});
    dispatch(getSchedules(schedules));
  });
};

export const removeSchedule = sId => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}`)
  .remove()
  .then(() => {
    dispatch(deleteSchedule());
  });
};

export const changeSchedule = (sId, changes) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}`)
  .set(changes)
  .then(() => {
    dispatch(editSchedule());
  });
};

export const saveTemplate = schedule => dispatch => {
  const {currentUser} = firebase.auth();
  let template = {
    title: schedule.title + ' Template',
    tasks: []
  }
  const tasks = _.map({...schedule.completedTasks,...schedule.tasks}, (val, uid) => {
    return {...val};
  });
  console.log("tasks", tasks)

  // firebase.database().ref(`/users/${currentUser.uid}/scheduleTemplates`)
  // .push(template)
  // .then(() => {
    dispatch(createTemplate());
  // });
};
