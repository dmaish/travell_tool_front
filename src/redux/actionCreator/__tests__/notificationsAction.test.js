import { addNotification, addNotificationFailure } from '../notificationsActions';
import { ADD_NOTIFICATION, ADD_NOTIFICATION_FAILURE } from '../../constants/actionTypes';

const newNotification = {
  senderId: 'sdgdgdg',
  recipientId: 'isgsdgdg',
  notificationType: 'general',
  notificationStatus: 'unread'
};

const error = true;

describe('Notification Actions', ()=>{
  it('should dispatch add notification action success', ()=>{
    const response = {
      type: ADD_NOTIFICATION,
      notification: newNotification
    };
    expect(addNotification(newNotification)).toEqual(response);
  });
  it('should dispatch add notification action failure', ()=>{
    const response = {
      type: ADD_NOTIFICATION_FAILURE,
      error: true
    };
    expect(addNotificationFailure(error)).toEqual(response);
  });
});
