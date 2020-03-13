import axios from 'axios';
import {resolveBaseUrl} from '.';

const baseUrl = resolveBaseUrl();

class ProfileAPI {
  static updateUserProfile(requestData, userId) {
    return axios.put(`${baseUrl}/user/${userId}/profile`, requestData);
  }
}


export default ProfileAPI;
