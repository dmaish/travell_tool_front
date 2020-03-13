import axios from 'axios';

import { resolveBaseUrl } from '.';

const baseUrl = resolveBaseUrl();

class RoleAPI {
  static putData(roleData) {
    return axios.put(`${baseUrl}/user/role/update`, roleData);
  }

  static getRoleData() {
    return axios.get(`${baseUrl}/user/roles`);
  }

  static getRoleUsers(roleId) {
    return axios.get(`${baseUrl}/user/roles/${roleId}`);
  }

  static deleteUserRole(userId, roleId) {
    return axios.delete(`${baseUrl}/user/roles/${userId}/${roleId}`);
  }

  static addRole(roleData) {
    return axios.post(`${baseUrl}/user/role`, roleData);
  }

  static updateRole(roleId, newRoleData) {
    return axios.patch(`${baseUrl}/user/role/${roleId}`, newRoleData);
  }
}
export default RoleAPI;
