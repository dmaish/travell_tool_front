import { put, takeLatest, call } from 'redux-saga/effects';
import {
  FETCH_NOTIFICATIONS,
  ADD_NOTIFICATION,
  UPDATE_ALL_NOTIFICATIONS_STATUS,
  MARK_SINGLE_NOTIFICATION_AS_READ
} from '../constants/actionTypes';
import {
  fetchUsersNotificationSuccess,
  fetchUsersNotificationFailure,
  addNotificationSuccess,
  updateAllNotificationStatusFailure,
  updateAllNotificationStatusSuccess,
  markSingleNotificationAsReadSuccess,
  markSingleNotificationAsReadFailure
} from '../actionCreator/notificationsActions';
import NotificationAPI from '../../services/NotificationsAPI';
import apiErrorHandler from '../../services/apiErrorHandler';

export function* fetchUsersNotificationSync() {
  try {
    const response = yield call(NotificationAPI.getNotifications);
    yield put(fetchUsersNotificationSuccess(response.data.notifications));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(fetchUsersNotificationFailure(errorMessage));
  }
}

export function* watchFetchNotifications() {
  yield takeLatest(FETCH_NOTIFICATIONS, fetchUsersNotificationSync);
}

export function* addNotificationSync(action) {
  yield put(addNotificationSuccess(action.notification));
}

export function* watchAddNotification() {
  yield takeLatest(ADD_NOTIFICATION, addNotificationSync);
}

export function* watchUpdateAllNotificationStatus() {
  yield takeLatest(
    UPDATE_ALL_NOTIFICATIONS_STATUS,
    updateAllNotificationStatusSync
  );
}

export function* updateAllNotificationStatusSync(action) {
  try {
    const { updateNotification } = NotificationAPI;
    const { statusUpdateData } = action;
    const serverResponse = yield call(updateNotification, statusUpdateData);
    yield put(updateAllNotificationStatusSuccess(serverResponse.data));

  } catch(error) {
    const errorMessage = apiErrorHandler(error);
    yield put(updateAllNotificationStatusFailure(errorMessage));
  }
}


export function* markSingleNotificationAsReadAsync(action) {
  try {
    const response = yield call(
      NotificationAPI.markSingleNotificationAsRead, action.notificationId
    );
    yield put(markSingleNotificationAsReadSuccess(response.data.notification));
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(markSingleNotificationAsReadFailure(errorMessage));
  }
}

export function* markSingleNotificationAsReadSaga() {
  yield takeLatest(MARK_SINGLE_NOTIFICATION_AS_READ, markSingleNotificationAsReadAsync);
}
