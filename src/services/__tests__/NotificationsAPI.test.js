import moxios from 'moxios';
import NotificationsAPI from '../NotificationsAPI';
import { resolveBaseUrl } from '../index';

const baseUrl = resolveBaseUrl();


describe('NotificationsAPI', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should send a `GET` request to retrieve notifications', async () => {
    moxios.stubRequest(`${baseUrl}/notifications`, {
      status: 200,
      response: { notifications: [] }
    });

    const response = await NotificationsAPI.getNotifications();
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/notifications`);
    expect(request.config.method).toEqual('get');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({ notifications: [] });
  });

  it('should send a `PUT` request to update notifications', async () => {
    moxios.stubRequest(`${baseUrl}/notifications`, {
      status: 200,
      response: { message: 'notification update was successful' }
    });

    const response = await NotificationsAPI.updateNotification();
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/notifications`);
    expect(request.config.method).toEqual('put');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ message: 'notification update was successful' });
  });

  it('should send a `PUT` request to update  a signle notification', async () => {
    const notificationId = 23;
    moxios.stubRequest(`${baseUrl}/notifications/${notificationId}`, {
      status: 200,
      response: { message: 'Single notification updated was successful' }
    });

    const response = await NotificationsAPI.markSingleNotificationAsRead(notificationId);
    const request = moxios.requests.mostRecent();
    expect(request.url).toEqual(`${baseUrl}/notifications/${notificationId}`);
    expect(request.config.method).toEqual('put');
    expect(response.status).toEqual(200);
    expect(response.data)
      .toEqual({ message: 'Single notification updated was successful' });
  });
});

