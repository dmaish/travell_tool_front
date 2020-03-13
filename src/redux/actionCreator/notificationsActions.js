import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS,
  UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS,
  MARK_SINGLE_NOTIFICATION_AS_READ,
  MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS,
  MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE
} from '../constants/actionTypes';

export const fetchUsersNotification = () => ({
  type: FETCH_NOTIFICATIONS
});
export const fetchUsersNotificationSuccess = notifications => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  notifications
});
export const fetchUsersNotificationFailure = error => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  error
});

export const addNotification = notification => ({
  type: ADD_NOTIFICATION,
  notification
});
export const addNotificationSuccess = notification => ({
  type: ADD_NOTIFICATION_SUCCESS,
  notification
});
export const addNotificationFailure = error => ({
  type: ADD_NOTIFICATION_FAILURE,
  error
});

export const updateAllNotificationStatus = (
  currentStatus,
  newStatus,
  notificationType
) => ({
  type: UPDATE_ALL_NOTIFICATIONS_STATUS,
  statusUpdateData: { currentStatus, newStatus, notificationType }
});

export const updateAllNotificationStatusSuccess = (response) => ({
  type: UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS,
  message: response.message
});

export const updateAllNotificationStatusFailure = (error) => ({
  type: UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
  error
});

export const markSingleNotificationAsRead = (notificationId) => ({
  type: MARK_SINGLE_NOTIFICATION_AS_READ,
  notificationId
});

export const markSingleNotificationAsReadSuccess = (notification) => ({
  type: MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS,
  notification
});

export const markSingleNotificationAsReadFailure = (error) => ({
  type: MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE,
  error
});
