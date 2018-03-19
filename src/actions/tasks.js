import firebase from 'firebase';
import {ADD_TASK, DELETE_TASK, COMPLETE_TASK, EDIT_TASK} from './types';

// export const addTask = () => ({type: ADD_TASK});
export const delTask = () => ({type: DELETE_TASK});
export const finishTask = () => ({type: COMPLETE_TASK});
export const editTask = () => ({type: EDIT_TASK});

// export const createTask = (sId, task ) => dispatch => {
//   const {currentUser} = firebase.auth();
//   firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks`)
//   .push(task)
//   .then(() => {
//     dispatch(addTask());
//   });
// };

export const removeTask = (sId, taskId) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks/${taskId}`)
  .remove()
  .then(() => {
    dispatch(delTask());
  });
};

export const changeTask = (sId, tId, change) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks/${tId}`)
  .set(change)
  .then(() => {
    dispatch(editTask());
  });
};
