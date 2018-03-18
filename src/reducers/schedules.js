import {GET_SCHEDULES, CREATE_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, CREATE_TEMPLATE} from '../actions/types';

const defaultState = {};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_SCHEDULES:
      return action.schedules;
    case CREATE_SCHEDULE:
    case DELETE_SCHEDULE:
    case EDIT_SCHEDULE:
      return state;
    default:
      return state;
  }
}
