import { LOGIN_USER,LOGOUT_USER,LOGIN_ERROR,LOADING, LOGIN_FORM_EDIT} from '../actions/types';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';


export const loginFormChange = change => ({type: LOGIN_FORM_EDIT, change});
export const loggingIn = user => ({type: LOGIN_USER, user});
export const showErr = () => ({type: LOGIN_ERROR});
export const loading = () => ({type: LOADING});
export const loggingOut = () => ({type: LOGOUT_USER});

export const loginAttempt = ({email, password}) => dispatch => {
  dispatch(loading());
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => {
    dispatch(loggingIn(user));
    Actions.main();
  })
  .catch(() => {
    throw firebase.auth().createUserWithEmailAndPassword(email, password);
  })
  .then(newUser => {
    dispatch(loggingIn(newUser));
    Actions.main();
  })
  .catch(err => dispatch(showErr(err)));
};

export const logout = () => dispatch => {
  dispatch(loading());
  firebase.auth().signOut()
  .then(() => dispatch(loggingOut()));
};

export const editForm = change => dispatch => dispatch(loginFormChange(change));
