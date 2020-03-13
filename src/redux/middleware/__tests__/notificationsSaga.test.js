import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  watchFetchNotifications,
  watchAddNotification,
  watchUpdateAllNotificationStatus,
  markSingleNotificationAsReadSaga
} from '../notificationsSaga';
import NotificationsAPI from '../../../services/NotificationsAPI';
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_SUCCESS,
  UPDATE_ALL_NOTIFICATIONS_STATUS,
  UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS,
  UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE
} from '../../constants/actionTypes';


describe('Notifications Saga', () => {
  describe('Fetch notification saga', () => {
    const response = {
      data: {
        notifications: []
      }
    };
    const error = 'Possible network error, please reload the page';

    it('fetches users notification', () => {
      return expectSaga(watchFetchNotifications, NotificationsAPI)
        .provide([[call(NotificationsAPI.getNotifications), response]])
        .put({
          type: FETCH_NOTIFICATIONS_SUCCESS,
          notifications: response.data.notifications
        })
        .dispatch({
          type: FETCH_NOTIFICATIONS
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s notifications', () => {
      return expectSaga(watchFetchNotifications, NotificationsAPI)
        .provide([[call(NotificationsAPI.getNotifications), throwError(error)]])
        .put({
          type: FETCH_NOTIFICATIONS_FAILURE,
          error
        })
        .dispatch({
          type: FETCH_NOTIFICATIONS
        })
        .run();
    });
  });

  describe('Add notification saga', () => {
    const response = {
      data: {
        notifications: []
      }
    };

    it('Add notification', () => {
      return expectSaga(watchAddNotification)
        .put({
          type: ADD_NOTIFICATION_SUCCESS,
          notification: response.data.notifications
        })
        .dispatch({
          type: ADD_NOTIFICATION,
          notification: response.data.notifications
        })
        .run();
    });
  });

  describe('Update all notification status saga', () => {
    const response = {
      data: {
        message: 'All pending notifications have been marked as read'
      }
    };

    const statusUpdateData =  {
      currentStatus: 'unread',
      newStatus: 'read',
      notificationType: 'pending'
    };

    it('update notification status', () => {
      return expectSaga(watchUpdateAllNotificationStatus)
        .provide([[
          call(NotificationsAPI.updateNotification, statusUpdateData),
          response
        ]])
        .put({
          type: UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS,
          message: response.data.message
        })
        .dispatch({
          type: UPDATE_ALL_NOTIFICATIONS_STATUS,
          statusUpdateData
        })
        .run();
    });

    it('handles failed update errors', () => {
      const error = new Error('Server error, try again');
      error.response = { status: 500 };

      return expectSaga(watchUpdateAllNotificationStatus)
        .provide([[
          call(NotificationsAPI.updateNotification, statusUpdateData),
          throwError(error)
        ]])
        .put({
          type: UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
          error: error.message
        })
        .dispatch({
          type: UPDATE_ALL_NOTIFICATIONS_STATUS,
          statusUpdateData
        })
        .run();
    });
  });

  describe('mark single notification as read', () => {
    const response = {
      data: {
        notification: ['notification 1']
      }
    };
    const error = {
      response: {
        data: {
          error: 'Notification saga error'
        }
      }
    };

    it('should mark notification as read', () => {
      return expectSaga(markSingleNotificationAsReadSaga, NotificationsAPI)
        .provide([[
          matchers.call.fn(NotificationsAPI.markSingleNotificationAsRead, 12),
          response
        ]])
        .put({
          type: 'MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS',
          notification: response.data.notification
        })
        .dispatch({
          type: 'MARK_SINGLE_NOTIFICATION_AS_READ',
          notificationId: 12
        })
        .run();
    });

    it('throws error while marking a notification as read', () => {
      return expectSaga(markSingleNotificationAsReadSaga, NotificationsAPI)
        .provide([[
          matchers.call.fn(NotificationsAPI.markSingleNotificationAsRead, 12),
          throwError(error)
        ]])
        .put({
          type: 'MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE',
          error: error.response.data.error
        })
        .dispatch({
          type: 'MARK_SINGLE_NOTIFICATION_AS_READ',
          notificationId: 12
        })
        .run();
    });
  });
});
