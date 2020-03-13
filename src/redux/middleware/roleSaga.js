import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import { FETCH_ROLE_USERS, DELETE_USER_ROLE } from '../constants/actionTypes';
import RoleAPI from '../../services/RoleAPI';
import apiErrorHandler from '../../services/apiErrorHandler';
import {
  fetchRoleUsersSuccess,
  fetchRoleUsersFailure,
  deleteUserRoleFailure,
  deleteUserRoleSuccess,
  hideDeleteRoleModal,
  addRoleFailure,
  addRoleSuccess
} from '../actionCreator/roleActions';

export function* watchFetchRoleUsers() {
  yield takeLatest(FETCH_ROLE_USERS, fetchRoleUsersSaga);
}
let response;
export function* fetchRoleUsersSaga(action) {
  try {
    response = yield call(RoleAPI.getRoleUsers, action.roleId);
    yield put(fetchRoleUsersSuccess(response.data.result));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchRoleUsersFailure(errorMessage));
  }
}

export function* watchDeleteUserRoleAsync() {
  yield takeLatest(DELETE_USER_ROLE, deleteUserRoleSaga);
}

export function* deleteUserRoleSaga(action) {
  try {
    const { userId, fullName, roleId } = action;
    response = yield call(RoleAPI.deleteUserRole, userId, roleId);
    yield put(deleteUserRoleSuccess(response.data.message, userId, roleId));
    yield put(hideDeleteRoleModal());
    toast.success(`${fullName} removed successfully!`);
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteUserRoleFailure(errorMessage));
    toast.error(errorMessage);
  }
}

