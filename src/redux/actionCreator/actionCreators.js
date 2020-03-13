import * as types from '../constants/actionTypes';

export const setCurrentUser = () => {
  return {
    type: types.SET_CURRENT_USER
  };
};

export const setCurrentUserSuccess = (response) => {
  return {
    type: types.SET_CURRENT_USER_SUCCESS,
    response: response
  };
};

export const setCurrentUserFailure = (error) => {
  return {
    type: types.SET_CURRENT_USER_FAILURE,
    error: error
  };
};
