import {takeLatest, put, call} from 'redux-saga/effects';
import toast from 'toastr';
import ApprovalsApi from '../../services/approvalsAPI';
import {
  fetchUserApprovals,
  fetchUserApprovalsSuccess,
  fetchUserApprovalsFailure,
  updateRequestStatus,
  updateRequestStatusSuccess,
  updateRequestStatusFailure
} from '../actionCreator';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchUserApprovalsSaga(action) {
  try {
    const approvals = yield call(ApprovalsApi.getUserApprovals, action.url);
    yield put(fetchUserApprovalsSuccess(approvals.data));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUserApprovalsFailure(error));
    toast.error(errorMessage);
  }
}

export function* watchFetchApprovals() {
  yield takeLatest(fetchUserApprovals().type, fetchUserApprovalsSaga);
}

export function* updateRequestStatusSaga(action) {
  try {
    const response = yield call(
      ApprovalsApi.updateRequestStatus, action.statusUpdateData
    );
    const { message, updatedRequest } = response.data;
    toast.success(message);
    yield put(updateRequestStatusSuccess(updatedRequest));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateRequestStatusFailure(errorMessage));
    toast.error(errorMessage);
  }
}

export function* watchUpdateRequestStatus() {
  yield takeLatest(updateRequestStatus().type, updateRequestStatusSaga);
}
