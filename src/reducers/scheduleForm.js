import {
SCHEDULE_FORM_EDIT, SCHEDULE_FORM_CLEAR, SCHEDULE_FORM_LOADING} from '../actions/types';

const defaultState = {
  title: '',
  loading: false,
  date: '',
  error: ''
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case SCHEDULE_FORM_EDIT:
      return Object.assign({}, state, action.change);
    case SCHEDULE_FORM_CLEAR:
      return defaultState;
    case SCHEDULE_FORM_LOADING:
      return Object.assign({}, state, {
        loading: true
      });
    default:
      return state;
  }
}
