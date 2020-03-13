import toast from 'toastr';
import { put, takeLatest, call } from 'redux-saga/effects';
import { ADD_MAINTENANCE_RECORD, UPDATE_MAINTENANCE_RECORD, DELETE_MAINTENANCE_RECORD } from '../constants/actionTypes';
import MaintainaceApi from '../../services/MaintainaceApi';
import maintenanceAction, 
{ updateMaintenanceRecordSuccess, 
  updateMaintenanceRecordError, 
  deleteMaintenanceRecordSuccess, 
  deleteMaintenanceRecordFailure, 
} from '../actionCreator/maintenanceAction';
import updateRoomState from '../actionCreator/roomActionCreator';
import apiErrorHandler from '../../services/apiErrorHandler';
import { closeModal } from '../actionCreator/modalActions';

export function* AddMainteinanceSaga(action) {
  try {
    const response = yield call(MaintainaceApi.addMaintainanceRecord, action.data, action.roomId);
    const message = response.data.message;
    yield put(updateRoomState({ fault: true}, action.roomId, action.startDate, action.endDate, action.guestHouseId));
    toast.success(message);
  } catch (error) { /* istanbul ignore next */
    const errorMessage = apiErrorHandler(error);
    toast.error(errorMessage);
    return error;
  }
}

export function* watchAddMainteinanceAsync() {
  yield takeLatest(ADD_MAINTENANCE_RECORD, AddMainteinanceSaga);
}

export function* updateMaintenanceAsync(action) {
  try {
    const response = yield call(MaintainaceApi.updateMaintenanceRecord, action.maintenance, action.roomId);
    const message = response.data.message;
    yield put(updateMaintenanceRecordSuccess(action.maintenance));
    toast.success(message);
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateMaintenanceRecordError(error));
    toast.error(errorMessage);
  }
}

export function* watchUpdateMaintenance() {
  yield takeLatest(UPDATE_MAINTENANCE_RECORD, updateMaintenanceAsync);
}

export function* deleteMaintenanceAsync(action) {
  try {
    const response = yield call(MaintainaceApi.deleteMaintenanceRecord, action.roomId);
    const message = response.data.message;
    yield put(deleteMaintenanceRecordSuccess(action.roomId));
    toast.success(message);
    yield put(closeModal());
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(deleteMaintenanceRecordFailure(error));
    toast.error(errorMessage);
  }
}

export function* watchDeleteMaintenance() {
  yield takeLatest(DELETE_MAINTENANCE_RECORD, deleteMaintenanceAsync);
}
