import firebase from 'firebase';
import {GET_SCHEDULES, CREATE_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, CREATE_TEMPLATE} from './types';

export const getSchedules = schedules => ({type: GET_SCHEDULES, schedules});
// export const createSchedule = () => ({type: CREATE_SCHEDULE});
export const deleteSchedule = () => ({type: DELETE_SCHEDULE});
export const editSchedule = () => ({type: EDIT_SCHEDULE});
export const createTemplate = () => ({type: CREATE_TEMPLATE});

export const fetchSchedules = () => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules`)
  .on('value', snapshot => {
    dispatch(getSchedules(snapshot.val()));
  });
};

// export const saveSchedule = schedule => dispatch => {
//   console.log("this is the real test", schedule)
//   const {currentUser} = firebase.auth();
//   firebase.database().ref(`/users/${currentUser.uid}/schedules`)
//   .push(schedule)
//   .then(() => {
//     dispatch(createSchedule());
//   });
// };

export const removeSchedule = sId => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database.ref(`/users/${currentUser.uid}/schedules/${sId}`)
  .remove()
  .then(() => {
    dispatch(deleteSchedule());
  });
};

export const changeSchedule = (sId, changes) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database.ref(`/users/${currentUser.uid}/schedules/${sId}`)
  .set(changes)
  .then(() => {
    dispatch(editSchedule());
  });
};

export const saveTemplate = template => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/scheduleTemplates`)
  .push(template)
  .then(() => {
    dispatch(createTemplate());
  });
};
