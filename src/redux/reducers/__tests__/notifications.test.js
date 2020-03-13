import notificationsReducer, { initialState } from '../notifications';
import {
  fetchUsersNotificationFailure,
  fetchUsersNotificationSuccess,
  addNotificationFailure,
  addNotificationSuccess,
  updateAllNotificationStatus,
  updateAllNotificationStatusFailure,
  updateAllNotificationStatusSuccess,
  markSingleNotificationAsRead,
  markSingleNotificationAsReadSuccess,
  markSingleNotificationAsReadFailure
} from '../../actionCreator/notificationsActions';
import notificationsMockData, { notification } from '../../__mocks__/notificationsMockData';

describe('Notifications reducer', () => {
  describe('Fetch notifications reducer', () => {
    it('should update on successfully fetching notification', (done) => {
      const action = fetchUsersNotificationSuccess(notificationsMockData);
      const newState = notificationsReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.notifications).toEqual(notificationsMockData);
      done();
    });

    it('should update error state on failing to fetching notification',
      (done) => {
        const action = fetchUsersNotificationFailure('Server Error');
        const newState = notificationsReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toBe(true);
        expect(newState.notifications.length).toEqual(0);
        done();
      });
  });

  describe('Add notifications reducer', () => {
    it('should add notification to state', (done) => {
      const action = addNotificationSuccess(notificationsMockData[0]);
      const newState = notificationsReducer(initialState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.notifications.length).toEqual(1);
      expect(newState.notifications[0]).toEqual(notificationsMockData[0]);
      done();
    });

    it('should update error state on failure to add notification to state',
      (done) => {
        const error = 'Server Error';
        const action = addNotificationFailure(error);
        const newState = notificationsReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.error).toEqual(error);
        expect(newState.notifications.length).toEqual(0);
        done();
      });
  });

  describe('Update notification status reducer', () => {
    it(`should update 'isLoading' state to true
      while sending status update server request`, (done) => {
      const action = updateAllNotificationStatus('unread', 'read', 'pending');
      const newState = notificationsReducer(initialState, action);
      expect(newState.isLoading).toBe(true);
      done();
    });

    it(`should update general notificationsStatus
      to read on successful status update response`, (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        notifications: [...notificationsMockData]
      };
      const updateSuccessResponse = {
        message: 'All general notifications have been marked as read'
      };
      const action = updateAllNotificationStatusSuccess(updateSuccessResponse);
      const newState = notificationsReducer(currentState, action);
      expect(newState.isLoading).toBe(false);
      expect(newState.notifications.length).toEqual(4);
      expect(newState.notifications[1].notificationStatus).toEqual('unread');
      expect(newState.notifications[2].notificationStatus).toEqual('read');
      expect(newState.notifications[3].notificationStatus).toEqual('read');
      done();
    });

    it(`should update pending notificationsStatus
      to read on successful status update response`, (done) => {
      const currentState = {
        ...initialState,
        isLoading: true,
        notifications: [...notificationsMockData]
      };
      const updateSuccessResponse = {
        message: 'All pending notifications have been marked as read'
      };
      const action = updateAllNotificationStatusSuccess(updateSuccessResponse);
      const newState = notificationsReducer(currentState, action);

      expect(newState.isLoading).toBe(false);
      expect(newState.notifications.length).toEqual(4);
      expect(newState.notifications[0].notificationStatus).toEqual('read');
      expect(newState.notifications[1].notificationStatus).toEqual('read');

      done();
    });

    it('should update notification error state to no status update error',
      (done) => {
        const updateError =
        'You have no unread general notifications at the moment';
        const action = updateAllNotificationStatusFailure(updateError);
        const newState = notificationsReducer(initialState, action);
        expect(newState.error).toEqual(updateError);
        done();
      });
  });

  describe('Mark notification as read', () => {
    beforeEach(() => initialState.notifications = notificationsMockData);
    it('should handle MARK_SINGLE_NOTIFICATION_AS_READ', (done) => {
      const action = markSingleNotificationAsRead(notification.id);
      const newState = notificationsReducer(initialState, action);
      expect(newState).toEqual({
        isLoading: true,
        notifications: [...notificationsMockData],
        singleNotificationRead: 0,
        error: null
      });
      done();
    });

    it('should handle MARK_SINGLE_NOTIFICATION_AS_READ_SUCCESS', (done) => {
      const action = markSingleNotificationAsReadSuccess(notification);
      initialState.notifications = [...notificationsMockData, notification];
      const markedNotification = {...notification};
      markedNotification.notificationStatus = 'read';
      const newState = notificationsReducer(initialState, action);
      expect(newState).toEqual({
        isLoading: false,
        notifications: [ ...notificationsMockData, markedNotification ],
        singleNotificationRead: 12,
        error: null
      });
      done();
    });

    it('should handle MARK_SINGLE_NOTIFICATION_AS_READ_FAILURE',
      (done) => {
        const error = 'Server Error';
        const action = markSingleNotificationAsReadFailure(error);
        const newState = notificationsReducer(initialState, action);
        expect(newState).toEqual({
          isLoading: false,
          notifications: [ ...notificationsMockData ],
          singleNotificationRead: 0,
          error
        });
        done();
      });
  });
});
