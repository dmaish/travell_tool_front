import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class MaintainaceApi {
  static addMaintainanceRecord(data, roomId) {
    return axios.post(`${baseUrl}/room/${roomId}/maintainance`, data);
  }

  static updateMaintenanceRecord(data, roomId) {
    return axios.put(`${baseUrl}/room/${roomId}/maintainance`, data);
  }

  static deleteMaintenanceRecord(roomId) {
    return axios.delete(`${baseUrl}/room/${roomId}/maintainance`);
  }
}

export default MaintainaceApi;
