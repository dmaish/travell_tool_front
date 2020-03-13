import axios from 'axios';
import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class CentersAPI {
  static fetchCenters() {
    return axios.get(`${baseUrl}/centers`);
  }

  static updateUserCenter(userId, newCenter) {
    return axios.patch(`${baseUrl}/center/user/${userId}`, newCenter);
  }
}

export default CentersAPI;
