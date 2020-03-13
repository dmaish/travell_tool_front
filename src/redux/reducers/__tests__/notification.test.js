import notification from '../notifications';
import {
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from '../../constants/actionTypes';

const initialState = {
  isLoading: false,
  notifications: [],
  singleNotificationRead: 0,
  error: null
};
const newNotification = {
  senderId: 'sfgjsgdd',
  recipientId: 'gdhfsafgs',
};
describe('Notifications Reducer', ()=> {
  it('return intial state with unknown action', ()=>{
    const unknownAction = {
      type: 'UKNOWN TYPE',
    };
    expect(notification(initialState, unknownAction)).toEqual(initialState);
  });
  it('should add new notification to the state', ()=>{
    const addNotification = {
      type: ADD_NOTIFICATION_SUCCESS,
      notification: newNotification
    };
    expect(notification(initialState, addNotification).notifications).toEqual([newNotification]);
  });
  it('should fetch notifications', ()=>{
    const allNotifications = [
      {
        senderId: 'sdgdgdg',
        recipientId: 'isgsdgdg',
        notificationType: 'general',
        notificationStatus: 'unread'
      },
      {
        senderId: 'gjkshfks',
        recipientId: 'isgsdgdg',
        notificationType: 'pending',
        notificationStatus: 'reading'
      },
    ];
    const fetchNotification = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      notifications: allNotifications
    };
    expect(notification(initialState, fetchNotification).notifications).toEqual(allNotifications);
  });
  it('should return error for fetching notification', ()=>{
    const fetchNotification = {
      type: FETCH_NOTIFICATIONS_FAILURE,
    };
    expect(notification(initialState, fetchNotification).error).toEqual(true);
  });
  it('should return error to add notification', ()=>{
    const addNotification = {
      type: ADD_NOTIFICATION_FAILURE,
      error: 'Failed to Add notification'
    };
    expect(notification(initialState, addNotification).error).toEqual(addNotification.error);
  });
});
