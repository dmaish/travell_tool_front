import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { FETCH_CENTERS, UPDATE_USER_CENTER } from '../constants/actionTypes';
import CentersAPI from '../../services/CentersAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchCentersSuccess,
  fetchCentersFailure,
  updateUserSuccess,
  updateUserFailure
} from '../actionCreator/centersActions';
import { closeModal } from '../actionCreator/modalActions';

export function* watchFetchCenters() {
  yield takeLatest(FETCH_CENTERS, fetchCentersSaga);
}
export function* fetchCentersSaga(action) {
  try {
    const response = yield call(CentersAPI.fetchCenters);
    yield put(fetchCentersSuccess(response.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchCentersFailure(errorMessage));
  }
}

export function* watchUpdateUserCenterAsync() {
  yield takeLatest(UPDATE_USER_CENTER, updateUserCenterSaga);
}

export function* updateUserCenterSaga(action) {
  try {
    const response = yield call(
      CentersAPI.updateUserCenter,
      action.userId,
      action.newCenter
    );
    yield put(updateUserSuccess(response.data));
    toast.success('User Center updated');
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateUserFailure(errorMessage));
    toast.error(errorMessage);
  }
}
