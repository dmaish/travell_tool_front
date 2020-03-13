import {UPDATE_ROOM_STATE, UPDATE_ROOM_STATE_SUCCESS } from  '../constants/actionTypes';
import response from '../../mockData/guestRoom';

const initialState = {
  isLoading: false,
  rooms:response
};

const rooms = (state=initialState, action)=>{
  switch(action.type){
  case UPDATE_ROOM_STATE:
    return {
      ...state,
      isLoading: true
    };
  default:
    return state;
  }
};

export default rooms;

