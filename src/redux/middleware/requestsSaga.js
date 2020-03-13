import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import {
  FETCH_USER_REQUESTS,
  CREATE_NEW_REQUEST,
  FETCH_USER_REQUEST_DETAILS,
  EDIT_REQUEST,
  DELETE_REQUEST
} from '../constants/actionTypes';
import RequestAPI from '../../services/RequestAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchUserRequestsSuccess,
  fetchUserRequestsFailure,
  createNewRequestSuccess,
  createNewRequestFailure,
  fetchUserRequestDetailsSuccess,
  fetchUserRequestDetailsFailure,
  editRequestSuccess,
  editRequestFailure,
  deleteRequestSuccess,
  deleteRequestFailure
} from '../actionCreator/requestActions';
import { closeModal } from '../actionCreator/modalActions';

export function* fetchUserRequestsSaga(action) {
  try {
    const response = yield call(RequestAPI.getUserRequests, action.url);
    yield put(fetchUserRequestsSuccess(response.data));
  }
  catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserRequestsFailure(errorMessage));
  }
}


export function* watchFetchRequests() {
  yield takeLatest(FETCH_USER_REQUESTS, fetchUserRequestsSaga);
}

// worker saga responsible for make api request
export function* createNewRequestSagaAsync(action) {
  try {
    const response = yield call(
      RequestAPI.postNewRequest, action.requestData
    );
    toast.success('Request created');
    yield put(createNewRequestSuccess(response.data.request));
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createNewRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}


// watcher saga listens for CREATE_NEW_REQUEST action type
export function* watchCreateNewRequestAsync() {
  yield takeLatest(CREATE_NEW_REQUEST, createNewRequestSagaAsync);
}

export function* fetchUserRequestsDetails(action) {
  try {
    const response = yield call(RequestAPI.getUserRequestDetails, action.requestId);
    yield put(fetchUserRequestDetailsSuccess(response.data.requestData));

  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserRequestDetailsFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchFetchUserRequestsDetails() {
  yield takeLatest(FETCH_USER_REQUEST_DETAILS, fetchUserRequestsDetails);
}

export function* editRequest(action) {
  try {
    const response = yield call(RequestAPI.editRequest, action.requestId, action.requestData);
    yield put(editRequestSuccess(response.data.updatedRequest));
    toast.success('Request updated');
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(editRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}
export function* watchEditRequest() {
  yield takeLatest(EDIT_REQUEST, editRequest);
}

export function* watchDeleteRequest() {
  yield takeLatest(DELETE_REQUEST, deleteRequestSaga);
}

export function* deleteRequestSaga(action) {
  try {
    const response = yield call(RequestAPI.deleteRequest, action.requestId);
    yield put(deleteRequestSuccess(response.data.message, action.requestId));

  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteRequestFailure(errorMessage));
    toast.error(errorMessage);
  }
}

