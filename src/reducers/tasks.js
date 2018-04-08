import {GET_TASKS, DELETE_TASK, COMPLETE_TASK, EDIT_TASK, GET_TASK_COUNT} from '../actions/types';

const defaultState = {
  tasks: {},
  taskCount: 0,
  complete: {}
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_TASKS:
      return Object.assign({},state,{tasks: action.tasks, complete:action.complete});
    case GET_TASK_COUNT:
      return Object.assign({}, state, {taskCount: action.count} )
    case DELETE_TASK:
    case COMPLETE_TASK:
    case EDIT_TASK:
    default:
      return state;
  }
}
