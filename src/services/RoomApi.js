import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class RoomApi {
  static markRoomAsFaulty(faultData, roomId) {
    return axios.put(`${baseUrl}/room/${roomId}/`, faultData);
  }
}

export default RoomApi;
