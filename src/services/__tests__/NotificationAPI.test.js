import moxios from 'moxios';
import NotificationAPI from '../NotificationsAPI';

const baseUrl = 'http://127.0.0.1:5000/api/v1';

const notifications = [
  {
    senderId: 'ggsfs',
    recipientId: 'bbdddg',
    notificationType: 'general',
    notificationStatus: 'unread'
  },
  {
    senderId: 'zfkghdkd',
    recipientId: 'ojdgdgd',
    notificationType: 'pending',
    notificationStatus: 'reading'
  },
]; 

describe('NotificationAPI', ()=>{
  beforeEach(() => {
    moxios.install();
  });
    
  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a Get request to retrieve all notifications', async ()=>{
    moxios.stubRequest(`${baseUrl}/notifications`, {
      status: 200,
      response: {
        data: notifications
      }
    });
    const response = await NotificationAPI.getNotifications();
    const request = moxios.requests.mostRecent();
    expect(response.data).toEqual({data: notifications});
  });

});
