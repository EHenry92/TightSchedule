import {GET_TASKS, DELETE_TASK, COMPLETE_TASK, EDIT_TASK} from '../actions/types';

const defaultState = {};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.tasks;
    case DELETE_TASK:
    case COMPLETE_TASK:
    case EDIT_TASK:
    default:
      return state;
  }
}
