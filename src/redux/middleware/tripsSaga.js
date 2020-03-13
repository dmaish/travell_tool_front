import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_TRIPS,
  UPDATE_TRIP,
  UPDATE_TRIP_ROOM
} from '../constants/actionTypes';
import TripsAPI from '../../services/TripsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchTrips,
  fetchTripsSuccess,
  fetchTripsFailure,
  updateTrip,
  updateTripSuccess,
  updateTripFailure,
  updateTripRoom,
  updateTripRoomSuccess,
  updateTripRoomFailure
} from '../actionCreator/tripActions';
import {initFetchTimelineData} from '../actionCreator';
import { closeModal } from '../actionCreator/modalActions';

export function* fetchTripsSaga() {
  let response;
  try {
    response = yield call(TripsAPI.getTrips);
    yield put(fetchTripsSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchTripsFailure(errorMessage));
  }
}

export function* watchFetchTrips() {
  yield takeLatest(FETCH_TRIPS, fetchTripsSaga);
}

export function* updateTripSaga(action) {
  try {
    const response = yield call(TripsAPI.updateTrip, action.tripId, action.tripData);
    yield put(updateTripSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateTripFailure(errorMessage));
  }
}

export function* watchUpdateTrip() {
  yield takeLatest(UPDATE_TRIP, updateTripSaga);
}

export function* updateTripRoomSaga(action) {
  try {
    const tripData = {
      bedId: action.data.bedId,
      reason: action.data.reason
    };
    yield call(TripsAPI.updateTripRoom, action.tripId, tripData);
    yield put(initFetchTimelineData(action.data.guestHouseId, action.data.startDate, action.data.endDate));
    toast.success('Room/Bed updated successfully');
    yield put(updateTripRoomSuccess());
    yield put(closeModal());
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateTripRoomFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchUpdateTripRoom() {
  yield takeLatest(UPDATE_TRIP_ROOM, updateTripRoomSaga);
}
