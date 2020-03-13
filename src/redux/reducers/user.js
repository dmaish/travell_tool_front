import {
  POST_USER_DATA,
  POST_USER_DATA_SUCCESS,
  POST_USER_DATA_FAILURE,
  GET_USER_DATA,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  postUserData: [],
  getUserData: {},
  currentUser: {},
  errors: [],
  getCurrentUserRole: [],
  isLoaded: false
};
const user = (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_DATA:
    return { ...state, isLoaded: false };
  case GET_USER_DATA_SUCCESS:
    return {
      ...state,
      getUserData: action.response,
      currentUser: action.response.result,
      getCurrentUserRole: action.response.result
        .roles.map(role => role.roleName),
      errors: [],
      isLoaded: true
    };
  case GET_USER_DATA_FAILURE:
    return {
      ...state,
      errors: action.error,
      isLoaded: false
    };
  case POST_USER_DATA:
    return { ...state };
  case POST_USER_DATA_SUCCESS:
    return {
      ...state,
      postUserData: action.userData,
    };
  case POST_USER_DATA_FAILURE:
    return {
      ...state,
      postUserData: action.response,
      errors: action.error
    };
  default:
    return state;
  }
};

export default user;
