import { LOGIN_USER,LOGOUT_USER,LOGIN_ERROR,LOADING, LOGIN_FORM_EDIT} from '../actions/types';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import {AsyncStorage} from 'react-native';


export const loginFormChange = change => ({type: LOGIN_FORM_EDIT, change});
export const loggingIn = () => ({type: LOGIN_USER});
export const showErr = () => ({type: LOGIN_ERROR});
export const loading = () => ({type: LOADING});
export const loggingOut = () => ({type: LOGOUT_USER});

export const loginAttempt = ({email, password}) => dispatch => {
  dispatch(loading());
  const storageData = {
      login: {email, password}
  };
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    dispatch(loggingIn());
    AsyncStorage.mergeItem('TightSchedule', JSON.stringify(storageData), () => {});
    Actions.main();
  })
  .catch(() => {
    throw firebase.auth().createUserWithEmailAndPassword(email, password);
  })
  .then(newUser => {
    dispatch(loggingIn());
    AsyncStorage.setItem('TightSchedule', JSON.stringify(storageData), () => {});
    Actions.main();
  })
  .catch(err => dispatch(showErr(err)));
};

export const logout = () => dispatch => {
  dispatch(loading());
  firebase.auth().signOut()
  .then(() => {
    AsyncStorage.removeItem('TightSchedule');
    dispatch(loggingOut());
    Actions.auth();
  });
};

export const editForm = change => dispatch => dispatch(loginFormChange(change));
