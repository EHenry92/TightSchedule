import { LOGIN_USER,LOGOUT_USER,LOGIN_ERROR,LOADING, LOGIN_FORM_EDIT} from './types';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import {AsyncStorage} from 'react-native';


export const loginFormChange = change => ({type: LOGIN_FORM_EDIT, change});
export const loggingIn = () => ({type: LOGIN_USER});
export const showErr = () => ({type: LOGIN_ERROR});
export const loading = () => ({type: LOADING});
export const loggingOut = () => ({type: LOGOUT_USER});

const finalizeLogin = (dispatch, storageData) => {
  dispatch(loggingIn());
  AsyncStorage.setItem('TightSchedule-Login', JSON.stringify(storageData), () => {});
  Actions.main();
};

export const loginAttempt = ({email, password}) => dispatch => {
  dispatch(loading());
  const storageData = {
      login: {email, password}
  };
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => finalizeLogin(dispatch, storageData))
  .catch(() => {
    throw firebase.auth().createUserWithEmailAndPassword(email, password);
  })
  .then(() => finalizeLogin(dispatch, storageData))
  .catch(err => dispatch(showErr(err)));
};

export const logout = () => dispatch => {
  dispatch(loading());
  firebase.auth().signOut()
  .then(() => {
    AsyncStorage.removeItem('TightSchedule-Login');
    dispatch(loggingOut());
    Actions.auth();
  });
};

export const editForm = change => dispatch => dispatch(loginFormChange(change));
