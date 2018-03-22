import firebase from 'firebase';
import {GET_TASKS, DELETE_TASK, COMPLETE_TASK, EDIT_TASK} from './types';

export const delTask = () => ({type: DELETE_TASK});
export const finishTask = () => ({type: COMPLETE_TASK});
export const editTask = () => ({type: EDIT_TASK});
export const getTasks = (tasks) => ({type: GET_TASKS, tasks});


export const fetchTasks = (sId) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks`)
  .on('value', snapshot => {
    dispatch(getTasks(snapshot.val()));
  });
};

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
  .update(change)
  .then(() => {
    dispatch(editTask());
  });
};
