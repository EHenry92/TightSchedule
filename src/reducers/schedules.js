import {GET_SCHEDULES, CREATE_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE, CREATE_TEMPLATE, GET_TEMPLATES} from '../actions/types';

const defaultState = {list: {}, temps: {}};

export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_SCHEDULES:
      return {...state, list: action.schedules};
    case GET_TEMPLATES:
      return {...state, temps: action.templates};
    case CREATE_SCHEDULE:
    case DELETE_SCHEDULE:
    case EDIT_SCHEDULE:
    case CREATE_TEMPLATE:
    default:
      return state;
  }
}
