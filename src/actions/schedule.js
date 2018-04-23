import firebase from 'firebase';
import {GET_SCHEDULES, CREATE_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, CREATE_TEMPLATE, GET_TEMPLATES,CLEAR_SCHEDULES} from './types';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

export const getSchedules = schedules => ({type: GET_SCHEDULES, schedules});
export const getTemplates = templates => ({type: GET_TEMPLATES, templates});
export const deleteSchedule = () => ({type: DELETE_SCHEDULE});
export const editSchedule = () => ({type: EDIT_SCHEDULE});
export const createTemplate = () => ({type: CREATE_TEMPLATE});
export const clearSchedules = () => ({type: CLEAR_SCHEDULES})

export const fetchSchedules = () => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules`)
  .on('value', snapshot => {
    let schedules = snapshot.val();
    AsyncStorage.mergeItem('TightSchedule', JSON.stringify({schedules}), () => {});
    dispatch(getSchedules(schedules));
  });
  firebase.database().ref(`/users/${currentUser.uid}/scheduleTemplates`)
  .on('value', snapshot => {
    let templates = snapshot.val();
    dispatch(getTemplates(templates));
  });
};


export const stopScheduleListner = () => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules`).off();
  firebase.database().ref(`/users/${currentUser.uid}/scheduleTemplates`).off();
  dispatch(clearSchedules());
};

export const removeSchedule = sId => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}`)
  .remove()
  .then(() => {
    dispatch(deleteSchedule());
  });
};

export const removeTemplate = tId => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/scheduleTemplates/${tId}`)
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
    title: schedule.title,
    tasks: []
  }
  let noPos = _.map({...schedule.completedTasks,...schedule.tasks}, (val, uid) => {
    return {
      title: val.title,
      durationHr: val.durationHr,
      durationMin: val.durationMin,
      pos: val.pos
    };
  });

  for(let i=0, counter = 0; i<noPos.length; i++) {
    if(noPos[i].pos == -1) {
      template.tasks[i]={...noPos[i], pos: counter};
      counter ++;
    }
    else {
      template.tasks[i]={...noPos[i], pos: counter + noPos[i].pos};
    }
  }

  firebase.database().ref(`/users/${currentUser.uid}/scheduleTemplates`)
  .push(template)
  .then(() => {
    dispatch(createTemplate());
  });
};
