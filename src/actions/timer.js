import {START_SCHEDULE, END_SCHEDULE, NEXT_TASK} from './types';
import firebase, {storage} from 'firebase';
import {AsyncStorage} from 'react-native';

export const start = () => {type: START_SCHEDULE};
export const end = () => {type: END_SCHEDULE};
export const next = () => {type:NEXT_TASK};

export const startSchedule = (schedule, tasks) => dispatch => {
 //save schedule id in local data
 let data = {name:schedule.name, id:schedule.uid, tasks:tasks}
 AsyncStorage.setItem(`TightSchedule-${schedule.name}`, JSON.stringify(data), () => {});
 //name: scheduleName task:[{taskName, taskDuration(min)}]
};

export const endSchedule = (name) => dispatch => {
  //remove schedule from local data
  AsyncStorage.removeItem(`TightSchedule-${name}`);
};

export const nexTask = (sName, tNum) => dispatch => {
  AsyncStorage.getItem(`TightSchedule-${sName}`, (err, result) => {
    if(err) console.log(err);
    const {tasks} = JSON.parse(result);
    let last = tasks.shift();
  //mark current list[0] as complete
  //remove current task from top of the list.
  //set time to put an end to the next task.

  });



}
