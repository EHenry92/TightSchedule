import { LOGIN_USER,LOGOUT_USER,LOGIN_ERROR,LOADING, LOGIN_FORM_EDIT} from '../actions/types';
import {} from '../actions';
const defaultState = {
  email: '',
  password: '',
  error: '',
  loading: false
};


export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGOUT_USER:
    case LOGIN_USER:
      return defaultState;
    case LOGIN_ERROR:
      return Object.assign({}, state,
        {error: 'Authentication Fail',
        password: '',
        loading: false
      });
    case LOADING:
      console.log('starting to load')
      return Object.assign({}, state,
        {error: '', loading: true}
      );
    case LOGIN_FORM_EDIT:
      return Object.assign({}, state, action.change);
    default:
      return state;
  }
}
