import rooms from '../room';
import {UPDATE_ROOM_STATE, UPDATE_ROOM_STATE_SUCCESS } from  '../../constants/actionTypes';
import response from '../../../mockData/guestRoom';

describe('Rooms reducer', () =>{
  const initialState = {
    isLoading: false,
    rooms:response
  };
  it('returns correct initial state', ()=>{
    expect(rooms(undefined, {})).toEqual({
      ...initialState
    });
  });

  it('returns correct state for UPDATE_ROOM_STATE', ()=>{
    const action = {
      type: UPDATE_ROOM_STATE
    };
    expect(rooms(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
});
