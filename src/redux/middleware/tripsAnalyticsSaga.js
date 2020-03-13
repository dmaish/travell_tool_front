import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import FileSaver from 'file-saver';
import {
  FETCH_DEPARTMENT_TRIPS_ANALYTICS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_SUCCESS,
  FETCH_DEPARTMENT_TRIPS_ANALYTICS_FAILURE
} from '../constants/actionTypes';
import AnalyticsAPI from '../../services/AnalyticsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchDepartmentTrips,
  fetchDepartmentTripsSuccess,
  fetchDepartmentTripsFailure,
} from '../actionCreator/tripAnalyticsActions';

export function* fetchDepartmentTripsSaga(action) {
  try {
    const response = yield call(AnalyticsAPI.getDepartmentTrips, action.query);
    if (action.query.type === 'file') {
      yield FileSaver.saveAs(response.data, 'Trips per Department Analytics');
    } else {
      yield put(fetchDepartmentTripsSuccess(response.data));
    }
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchDepartmentTripsFailure(errorMessage));
  }
}

export function* watchFetchDepartmentTrips() {
  yield takeEvery(FETCH_DEPARTMENT_TRIPS_ANALYTICS, fetchDepartmentTripsSaga);
}
