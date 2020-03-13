import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class NotificationsAPI {
  static getNotifications() {
    return axios.get(`${baseUrl}/notifications`);
  }

  static updateNotification(updateData) {
    return axios.put(`${baseUrl}/notifications`, updateData);
  }

  static markSingleNotificationAsRead(notificationId) {
    return axios.put(`${baseUrl}/notifications/${notificationId}`);
  }
}

export default NotificationsAPI;
