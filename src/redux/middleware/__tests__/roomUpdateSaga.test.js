import { call } from 'redux-saga/effects';
import moxios from 'moxios';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import RoomApi from '../../../services/RoomApi';
import  updateRoomState from '../../actionCreator/roomActionCreator';
import { UPDATE_ROOM_STATE, UPDATE_ROOM_STATE_SUCCESS } from '../../constants/actionTypes';
import {initFetchTimelineData} from '../../actionCreator';
import {watchUpdateRoomsAsync} from '../roomUpdateSaga';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';

const response = {
  data: {
    guestHouses,
    success: true,
    message: 'Successfully retrieved guestHouses'
  }
};
const error = 'Possible network error, please reload the page';
describe('Room fault status saga', () =>{
  const action = {
    data:{
      fault: true
    },
    roomId:'yjhk54yew',
    startDate: '12/12/2019',
    endDate: '13/12/2019',
    guestHouseId: 'yjhk54yew'
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  const roomId = 'yjhk54yew';

  it('updates the fault status of a room', () =>{
    moxios.stubRequest(`${baseUrl}/room/${roomId}/`, {
      status: 201,
      response:{
        'success': true,
        'message': 'Room maintainance details updated successfully',
        'result': {
          'id': 'TE0oe3bJcn',
          'roomName': 'big cutter',
          'roomType': 'ensuited',
          'bedCount': 1,
          'faulty': true,
          'createdAt': '2018-10-08T06:56:18.712Z',
          'updatedAt': '2018-10-08T06:56:39.984Z',
          'guestHouseId': 'qwPzestIY'
        }
      }
    });


    return expectSaga(watchUpdateRoomsAsync, RoomApi)
      .provide([[call(RoomApi.markRoomAsFaulty, action.roomId), action.data]])
      .put({
        type: 'INIT_FETCH_TIMELINE_DATA',
        guestHouseId: action.guestHouseId,
        startDate: action.startDate,
        endDate: action.endDate
      })
      .dispatch({
        type: 'UPDATE_ROOM_STATE',
        response: action.data,
        roomId: action.roomId,
        guestHouseId: action.guestHouseId,
        startDate: action.startDate,
        endDate: action.endDate
      })
      .run();
  });
});

