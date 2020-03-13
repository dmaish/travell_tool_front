import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_SUCCESS,
  ADD_NOTIFICATION,
  ADD_NOTIFICATION_FAILURE,
  ADD_NOTIFICATION_SUCCESS,
  UPDATE_ALL_NOTIFICATIONS_STATUS,
  UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
  UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS
} from '../../constants/actionTypes';

import {
  fetchUsersNotification,
  fetchUsersNotificationFailure,
  fetchUsersNotificationSuccess,
  addNotification,
  addNotificationFailure,
  addNotificationSuccess,
  updateAllNotificationStatus,
  updateAllNotificationStatusFailure,
  updateAllNotificationStatusSuccess,
  markSingleNotificationAsRead,
  markSingleNotificationAsReadSuccess,
  markSingleNotificationAsReadFailure
} from '../notificationsActions';
import notificationsMockData from '../../__mocks__/notificationsMockData';

describe('Notification actions test', () => {
  describe('Fetch Notifications actions', () => {
    it('should return action of type `FETCH_NOTIFICATIONS', () => {
      const expectedAction = {
        type: FETCH_NOTIFICATIONS,
      };

      const newAction = fetchUsersNotification();

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type `FETCH_NOTIFICATIONS_FALIURE',
      () => {
        const error = {
          response: {
            success: false,
            message: 'Server Error'
          }
        };

        const expectedAction = {
          type: FETCH_NOTIFICATIONS_FAILURE,
          error
        };

        const newAction = fetchUsersNotificationFailure(error);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type `FETCH_NOTIFICATIONS_SUCCESS',
      () => {
        const response = {
          success: true,
          message: 'All general notifications status have been marked as read'
        };

        const expectedAction = {
          type: FETCH_NOTIFICATIONS_SUCCESS,
          notifications: [...notificationsMockData]
        };

        const newAction = fetchUsersNotificationSuccess(notificationsMockData);
        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Add Notification actions', () => {
    it('should return action of type `ADD_NOTIFICATION', () => {
      const expectedAction = {
        type: ADD_NOTIFICATION,
        notification: notificationsMockData[0]
      };

      const newAction = addNotification(notificationsMockData[0]);
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type `ADD_NOTIFICATION_FALIURE', () => {
      const error = {
        response: {
          success: false,
          message: 'Server Error'
        }
      };

      const expectedAction = {
        type: ADD_NOTIFICATION_FAILURE,
        error
      };

      const newAction = addNotificationFailure(error);
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type `ADD_NOTIFICATION_SUCCESS', () => {
      const expectedAction = {
        type: ADD_NOTIFICATION_SUCCESS,
        notification: notificationsMockData[1]
      };

      const newAction = addNotificationSuccess(notificationsMockData[1]);
      expect(newAction).toEqual(expectedAction);
    });
  });

  describe('Update all Notifications Status actions', () => {
    it('should return action of type `UPDATE_ALL_NOTIFICATIONS_STATUS', () => {
      const currentStatus = 'unread';
      const newStatus = 'read';
      const notificationType = 'general';

      const expectedAction = {
        type: UPDATE_ALL_NOTIFICATIONS_STATUS,
        statusUpdateData: {
          currentStatus,
          newStatus,
          notificationType
        }
      };

      const newAction = updateAllNotificationStatus(
        currentStatus,
        newStatus,
        notificationType
      );

      expect(newAction).toEqual(expectedAction);
    });

    it('should return action of type `UPDATE_ALL_NOTIFICATIONS_STATUS_FALIURE',
      () => {
        const error = {
          response: {
            success: false,
            message: 'Error occurred while trying to update notification status'
          }
        };

        const expectedAction = {
          type: UPDATE_ALL_NOTIFICATIONS_STATUS_FAILURE,
          error
        };

        const newAction = updateAllNotificationStatusFailure(error);
        expect(newAction).toEqual(expectedAction);
      });

    it('should return action of type `UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS',
      () => {
        const response = {
          success: true,
          message: 'All general notifications status have been marked as read'
        };

        const expectedAction = {
          type: UPDATE_ALL_NOTIFICATIONS_STATUS_SUCCESS,
          message: response.message
        };

        const newAction = updateAllNotificationStatusSuccess(response);

        expect(newAction).toEqual(expectedAction);
      });
  });

  describe('Mark single notification as read', () => {
    it('should return action of type MARK_SINGLE_NOTIFICATION_AS_READ', () => {
      const expectedAction = {
        type: 'MARK_SINGLE_NOTIFICATION_AS_READ',
        notificationId: 12
      };
      expect(markSingleNotificationAsRead(12)).toEqual(expectedAction);
    });

    it('should return action of type MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS', () => {
      const expectedAction = {
        type: 'MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS',
        notification: 'updated notification'
      };
      expect(markSingleNotificationAsReadSuccess('updated notification')).toEqual(expectedAction);
    });

    it('should return action of type MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE', () => {
      const expectedAction = {
        type: 'MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE',
        error: 'updated notification error'
      };
      expect(markSingleNotificationAsReadFailure('updated notification error')).toEqual(expectedAction);
    });
  });
});
