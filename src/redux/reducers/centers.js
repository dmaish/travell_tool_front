import {
  FETCH_CENTERS,
  FETCH_CENTERS_SUCCESS,
  FETCH_CENTERS_FAILURE,
  UPDATE_USER_CENTER,
  UPDATE_USER_CENTER_SUCCESS,
  UPDATE_USER_CENTER_FAILURE,
} from '../constants/actionTypes';

const centers = (state = {}, action) => {
  switch(action.type) {
  case FETCH_CENTERS:
    return {...state, isLoading: true };
  case FETCH_CENTERS_SUCCESS:
    return {
      ...state, isLoading: false, centers: action.centers };
  case FETCH_CENTERS_FAILURE:
    return {
      ...state, isLoading: false, centersError: action.error };
  case UPDATE_USER_CENTER:
    return { ...state, isLoading: true };
  case UPDATE_USER_CENTER_SUCCESS:
    return {...state, isLoading: false, userCenter: action.userCenter };
  case UPDATE_USER_CENTER_FAILURE:
    return {
      ...state,
      isLoading: false,
      userCenterError: action.userCenterError
    };
  default:
    return state;
  }
};

export default centers;

