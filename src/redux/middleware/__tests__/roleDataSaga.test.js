import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import RoleAPI from '../../../services/RoleAPI';
import {
  watchPutRoleDataSagaAsync,
  watchGetRoleDataSagaAsync,
  watchAddRoleSaga,
  watchUpdateRoleSaga
} from '../roleDataSaga';
import roles from '../../__mocks__/role';

const response = {
  data: {
    ...roles
  }
};

const newRole = {
  roleName: 'A new role',
  description: 'Some role'
};

const updateRole = {
  roleName: 'Updated role',
  description: 'This is updated role'
};

const updateRoleResponse = {
  data: { updateRole }
};

const addRoleResponse = {
  data: {
    result: newRole
  }
};

const action = {
  roleData: {
    roleName: 'super man',
    email: 'super.man@andela.com'
  }
};

const error = 'Possible network error, please reload the page';

describe('Role Saga', () => {
  describe('Fetch roles saga', () => {
    it('fetches roles ', () => {
      return expectSaga(watchGetRoleDataSagaAsync, RoleAPI)
        .provide([[call(RoleAPI.getRoleData), response]])
        .put({
          type: 'GET_ROLE_DATA_SUCCESS',
          response: response.data
        })
        .dispatch({
          type: 'GET_ROLE_DATA'
        })
        .run();
    });
    it('throws error if there is an error fetching a roles', () => {
      return expectSaga(watchGetRoleDataSagaAsync, RoleAPI)
        .provide([[call(RoleAPI.getRoleData), throwError(error)]])
        .put({
          type: 'GET_ROLE_DATA_FAILURE',
          error
        })
        .dispatch({
          type: 'GET_ROLE_DATA'
        })
        .run();
    });

    it('update roles ', () => {
      return expectSaga(watchPutRoleDataSagaAsync, RoleAPI)
        .provide([[call(RoleAPI.putData, action.data), response]])
        .put({
          type: 'PUT_ROLE_DATA_SUCCESS',
          roleData: response.data
        })
        .dispatch({
          type: 'PUT_ROLE_DATA'
        })
        .run();
    });

    it('throws error if there is an error updating a roles', () => {
      return expectSaga(watchPutRoleDataSagaAsync, RoleAPI)
        .provide([[call(RoleAPI.putData, action.data), throwError(error)]])
        .put({
          type: 'PUT_ROLE_DATA_FAILURE',
          error
        })
        .dispatch({
          type: 'PUT_ROLE_DATA'
        })
        .run();
    });
  });


  describe('Add role saga', () => {
    it('adds a role ', () => {
      const response = addRoleResponse;
      return expectSaga(watchAddRoleSaga, RoleAPI)
        .provide([
          [matchers.call.fn(RoleAPI.addRole, newRole), response]
        ])
        .put({
          type: 'ADD_ROLE_SUCCESS',
          role: response.data.result
        })
        .dispatch({
          type: 'ADD_ROLE',
          newRole
        })
        .run();
    });
    it('throws error if there is an error addin a roles', () => {
      return expectSaga(watchAddRoleSaga, RoleAPI)
        .provide([
          [matchers.call.fn(RoleAPI.addRole), throwError(error)]
        ])
        .put({
          type: 'ADD_ROLE_FAILURE',
          error
        })
        .dispatch({
          type: 'ADD_ROLE',
          newRole
        })
        .run();
    });
    it('updates a role', () => {
      const response = updateRoleResponse;
      return expectSaga(watchUpdateRoleSaga, RoleAPI)
        .provide([
          [matchers.call.fn(RoleAPI.updateRole, updateRole), response]
        ])
        .put({
          type: 'UPDATE_ROLE_SUCCESS',
          role: response.data
        })
        .dispatch({
          type: 'UPDATE_ROLE',
          updateRole
        })
        .run();
    });
    it('throws an error if it exist when updating roles', () => {
      return expectSaga(watchUpdateRoleSaga, RoleAPI)
        .provide([
          [matchers.call.fn(RoleAPI.updateRole), throwError(error)]
        ])
        .put({
          type: 'UPDATE_ROLE_FAILURE',
          error
        })
        .dispatch({
          type: 'UPDATE_ROLE',
          updateRole
        })
        .run();
    });
  });

});
