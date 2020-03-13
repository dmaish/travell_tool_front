import {
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS,
  UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS,
  MARK_SINGLE_NOTIFICATION_AS_READ,
  MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS,
  MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE
} from '../constants/actionTypes';
import { updateNotificationsStatus } from '../../helper/notifications-helper';

export const initialState = {
  isLoading: false,
  notifications: [],
  singleNotificationRead: 0,
  error: null
};

let index = 0;
let updatedNotifications;
const notifications = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_NOTIFICATIONS_SUCCESS:
    return { ...state,
      notifications: action.notifications, isLoading: false, error: null };
  case FETCH_NOTIFICATIONS_FAILURE:
    return { ...state, error: true };
  case ADD_NOTIFICATION_SUCCESS:
    return { ...state, notifications: [ action.notification, ...state.notifications ] };
  case ADD_NOTIFICATION_FAILURE:
    return { ...state, error: action.error };
  case UPDATE_ALL_NOTIFICATIONS_STATUS:
    return { ...state, isLoading: true };
  case UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS:
    return {
      ...state, isLoading: false, singleNotificationRead: 0,
      notifications: updateNotificationsStatus(state, action.message)
    };
  case UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE:
    return { ...state, isLoading: false, error: action.error, singleNotificationRead: 0 };
  case MARK_SINGLE_NOTIFICATION_AS_READ:
    return { ...state, isLoading: true };
  case MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS:
    updatedNotifications = [...state.notifications];
    index = updatedNotifications.findIndex(notification => notification.id == action.notification.id);
    updatedNotifications[index].notificationStatus = 'read';
    return {
      ...state, notifications: updatedNotifications,
      isLoading: false, singleNotificationRead: action.notification.id
    };
  case MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE:
    return { ...state, isLoading: false, error: action.error, singleNotificationRead: 0 };
  default: return state;
  }
};

export default notifications;
