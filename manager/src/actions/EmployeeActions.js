import { Actions } from 'react-native-router-flux';

import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_EDIT
} from './types';

export const employeeUpdate = ({ prop, value }) => ({
  type: EMPLOYEE_UPDATE,
  payload: { prop, value }
});

export const employeeCreate = ({ name, phone, shift }) => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/auth'); // eslint-disable-line global-require
  require('firebase/database'); // eslint-disable-line global-require

  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.pop();
      });
  };
};

export const employeesFetch = () => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/auth'); // eslint-disable-line global-require
  require('firebase/database'); // eslint-disable-line global-require

  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeEdit = ({ name, phone, shift, uid }) => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/auth'); // eslint-disable-line global-require
  require('firebase/database'); // eslint-disable-line global-require

  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_EDIT });
        Actions.pop();
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const firebase = require('firebase'); // eslint-disable-line global-require
  require('firebase/auth'); // eslint-disable-line global-require
  require('firebase/database'); // eslint-disable-line global-require

  const { currentUser } = firebase.auth();
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove().then(() => {
        Actions.pop();
      });
  };
};
