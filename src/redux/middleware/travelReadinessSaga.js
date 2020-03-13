import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import FileSaver from 'file-saver';
import ReadinessAPI from '../../services/ReadinessAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import { FETCH_TRAVEL_READINESS, EXPORT_TRAVEL_READINESS } from '../constants/actionTypes';
import { fetchReadinessSuccess, fetchReadinessFailure, exportReadinessFailure, exportReadinessSuccess } from '../actionCreator/travelReadinessActions';

//fetch Travel Readiness from API and dispatch action to get this data to store via reducer
export function* fetchReadinessSaga(action){
  try{
    const response = yield call(ReadinessAPI.getTravelReadiness, action.query);
    yield put(fetchReadinessSuccess(response.data));
  }catch(error){
    let errorMessage = apiErrorHandler(error);
    yield put(fetchReadinessFailure(errorMessage));
  }
}

export function* watchFetchReadiness(){
  yield takeEvery(FETCH_TRAVEL_READINESS, fetchReadinessSaga);
}

export function* exportReadinessSaga(action){
  try{
    const response = yield call(ReadinessAPI.exportTravelReadiness, action.query);
    yield FileSaver.saveAs(response.data, 'Travel readiness for all travelers.csv');
    yield put(exportReadinessSuccess());
  }catch(error){
    let errorMessage = apiErrorHandler(error);
    yield put(exportReadinessFailure(errorMessage));
  }
}

export function* watchExportReadiness(){
  yield takeEvery(EXPORT_TRAVEL_READINESS, exportReadinessSaga);
}
