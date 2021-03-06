import firebase from 'firebase';
import {GET_TASKS, DELETE_TASK, COMPLETE_TASK, EDIT_TASK, GET_TASK_COUNT, GET_COMPLETE_TASKS, CLEAR_TASKS} from './types';

export const delTask = () => ({type: DELETE_TASK});
export const finishTask = () => ({type: COMPLETE_TASK});
export const editTask = () => ({type: EDIT_TASK});
export const getTasks = tasks => ({type: GET_TASKS, tasks});
export const getComplete = complete => ({type:GET_COMPLETE_TASKS, complete});
export const clearTasks = () => ({type: CLEAR_TASKS});




export const fetchTasks = (sId) => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks`)
  .on('value', snapshot => {
    dispatch(getTasks(snapshot.val()));
  });
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/completedTasks`)
  .on('value', snapshot => {
    dispatch(getComplete(snapshot.val()));
  });
};

export const stopTaskListener = () => dispatch => {
  const {currentUser} = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/tasks`).off();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/completedTasks`).off();
  firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/taskCount`).off();
  dispatch(clearTasks());
}

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

export const markCmp = (sId, task) => {
  const {currentUser} = firebase.auth();
  remTask(sId, task.uid);
  return firebase.database().ref(`/users/${currentUser.uid}/schedules/${sId}/completedTasks`)
  .push({title: task.title, durationMin: task.durationMin, durationHr: task.durationHr, pos: -1})
};

export const completeTask = (sId, task) => dispatch => {
  markCmp(sId, task)
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
