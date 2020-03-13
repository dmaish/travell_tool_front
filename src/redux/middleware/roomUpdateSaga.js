import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { UPDATE_ROOM_STATE, UPDATE_ROOM_STATE_SUCCESS } from '../constants/actionTypes';
import  updateRoomState from '../actionCreator/roomActionCreator';
import {initFetchTimelineData} from '../actionCreator';

import RoomApi from '../../services/RoomApi';

export function* updateRoomStatusSaga(action) {
  try {
    const roomResponse = yield call(RoomApi.markRoomAsFaulty, action.data, action.roomId);
    yield put(initFetchTimelineData(action.guestHouseId, action.startDate, action.endDate));
    const message = roomResponse.data.message;
  } catch (error) { /* istanbul ignore next */
    return error;
  }
}

export function* watchUpdateRoomsAsync() {
  yield takeLatest(UPDATE_ROOM_STATE, updateRoomStatusSaga);
}
