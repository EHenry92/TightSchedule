import {TASK_FORM_EDIT, TASK_FORM_CLEAR, TASK_FORM_LOADING} from '../actions/types';

const defaultState = {
  title: '',
  description: '',
  durationMin: 0,
  durationHr: 0,
  complete: false,
  loading: false,
  error: ' '
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case TASK_FORM_EDIT:
      return Object.assign({}, state, action.change);
    case TASK_FORM_CLEAR:
      return defaultState;
    case TASK_FORM_LOADING:
      return Object.assign({}, state, {
        loading: true
      });
    default:
      return state;
  }
}
