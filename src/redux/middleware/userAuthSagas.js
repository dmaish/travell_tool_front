import { put, takeLatest, call  } from 'redux-saga/effects';
import { userDetails } from '../../helper/userDetails';
import {setCurrentUser,
  setCurrentUserSuccess,
  setCurrentUserFailure} from '../actionCreator';

export function* userAuth() {
  yield takeLatest(setCurrentUser().type, setUser);
}

export function* setUser() {
  try {
    const response = yield call(userDetails);
    yield put(setCurrentUserSuccess(response));

  } catch (error) {
    yield put(setCurrentUserFailure(error));
  }
}
