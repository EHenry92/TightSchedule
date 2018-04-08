import firebase from 'firebase';
import {GET_TASKS, DELETE_TASK, COMPLETE_TASK, EDIT_TASK, GET_TASK_COUNT} from './types';

export const delTask = () => ({type: DELETE_TASK});
export const finishTask = () => ({type: COMPLETE_TASK});
export const editTask = () => ({type: EDIT_TASK});
export const getTasks = tasks => ({type: GET_TASKS, tasks});
export const getComplete = complete => ({type:GET_TASKS, complete});




export const fetchTasks = (sId) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks`)
  .on('value', snapshot => {
    dispatch(getTasks(snapshot.val()));
  });
  // firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/completedTasks`)
  // .on('value', snapshot => {
  //   dispatch(getComplete(snapshot.val()));
  // });
};

const remTask = (sId, taskId) => {
  const {currentUser} = firebase.auth();
  return firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks/${taskId}`)
  .remove()
};

export const removeTask = (sId, taskId) => dispatch => {
  remTask(sId, taskId)
  .then(() => {
    dispatch(delTask());
  });
};

export const completeTask = (sId, task) => dispatch => {
  const {currentUser} = firebase.auth();
  remTask(sId, task.uid)
  .then(
    firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/completedTasks`)
    .push(task)
  )
  .then(() => {
    dispatch(finishTask());
  });

}


export const changeTask = (sId, tId, change) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks/${tId}`)
  .update(change)
  .then(() => {
    dispatch(editTask());
  });
};
