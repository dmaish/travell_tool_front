import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import RequestAPI from '../../../services/RequestAPI';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails,
  watchEditRequest,
  watchDeleteRequest
} from '../requestsSaga';
import { fetchRequestsResponse } from '../../__mocks__/mocks';

const url = '/requests?page=2';
const requestId = 'xDh20cuGx';
const response = {
  data: {
    ...fetchRequestsResponse
  }
};
const error = 'Possible network error, please reload the page';

describe('Requests Saga', () => {
  describe('Fetch requests saga', () => {
    it('fetches users request', () => {
      return expectSaga(watchFetchRequests, RequestAPI)
        .provide([
          [matchers.call.fn(RequestAPI.getUserRequests, url), response]
        ])
        .put({
          type: 'FETCH_USER_REQUESTS_SUCCESS',
          requests: response.data.requests,
          meta: response.data.meta,
          message: response.data.message,
        })
        .dispatch({
          type: 'FETCH_USER_REQUESTS',
          url
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchFetchRequests, RequestAPI)
        .provide([
          [matchers.call.fn(RequestAPI.getUserRequests, url), throwError(error)]
        ])
        .put({
          type: 'FETCH_USER_REQUESTS_FAILURE',
          error
        })
        .dispatch({
          type: 'FETCH_USER_REQUESTS',
          url
        })
        .run();
    });

  });

  describe('Create New Request Saga', () => {
    const action = {
      requestData: {
        name: 'Incredible Hulk',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    };

    const response = {
      data: { request: { name: 'Incredible Hulk', status: 'Open' } }
    };

    const error = {
      response: {
        status: 422,
        data: {
          errors: [{msg: 'Name is required'}, {msg: 'Destination is required'}]
        }
      }
    };

    it('Posts a new request successfully', () => {
      return expectSaga(watchCreateNewRequestAsync, RequestAPI)
        .provide([
          [matchers.call.fn(RequestAPI.postNewRequest, action.requestData), response]
        ])
        .put({
          type: 'CREATE_NEW_REQUEST_SUCCESS',
          newRequest: { name: 'Incredible Hulk', status: 'Open' }
        })
        .dispatch({
          type: 'CREATE_NEW_REQUEST',
          requestData: action.requestData
        })
        .run();
    });

    it('throws error while creating a new request', () => {
      return expectSaga(watchCreateNewRequestAsync, RequestAPI)
        .provide([
          [matchers.call.fn(RequestAPI.postNewRequest, action.requestData), throwError(error)]
        ])
        .put({
          type: 'CREATE_NEW_REQUEST_FAILURE',
          error: 'Name is required, Destination is required'
        })
        .dispatch({
          type: 'CREATE_NEW_REQUEST',
          requestData: action.requestData
        })
        .run();
    });
  });
  describe('Fetch request details Saga', () => {
    it('fetches request details', () => {
      return expectSaga(watchFetchUserRequestsDetails, RequestAPI)
        .provide([
          [call(RequestAPI.getUserRequestDetails, requestId), response]
        ])
        .put({
          type: 'FETCH_USER_REQUEST_DETAILS_SUCCESS',
          requestData: response.data.requestData,
        })
        .dispatch({
          type: 'FETCH_USER_REQUEST_DETAILS',
          requestId
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests details', () => {
      return expectSaga(watchFetchUserRequestsDetails, RequestAPI)
        .provide([
          [call(RequestAPI.getUserRequestDetails, requestId), throwError(error)]
        ])
        .put({
          type: 'FETCH_USER_REQUEST_DETAILS_FAILURE',
          error
        })
        .dispatch({
          type: 'FETCH_USER_REQUEST_DETAILS',
          requestId
        })
        .run();
    });
  });

  describe('Edit request details Saga', () => {
    const action = {
      requestData: {
        name: 'Incredible Hulk',
        origin: 'Lagos',
        destination: 'Nairobi'
      }
    };

    const response = {
      data: {
        updatedRequest: {
          name: 'Incredible Hulk',
          origin: 'Lagos',
          destination: 'Nairobi'
        }
      }
    };

    it('edits request details', () => {
      return expectSaga(watchEditRequest, RequestAPI)
        .provide([
          [call(RequestAPI.editRequest, requestId, action.requestData), response]
        ])
        .put({
          type: 'EDIT_REQUEST_SUCCESS',
          updatedRequest: response.data.updatedRequest,
        })
        .dispatch({
          type: 'EDIT_REQUEST',
          requestId,
          requestData: action.requestData
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests details', () => {
      return expectSaga(watchEditRequest, RequestAPI)
        .provide([
          [call(RequestAPI.editRequest, requestId, action.requestData), throwError(error)]
        ])
        .put({
          type: 'EDIT_REQUEST_FAILURE',
          error
        })
        .dispatch({
          type: 'EDIT_REQUEST',
          requestId,
          requestData: action.requestData
        })
        .run();
    });
  });

  describe('Delete request Saga', () => {
    const action = {
      requestId: '45TGF56'
    };

    const response = {
      data: {
        message: 'Request 45TGF56 has been successfully deleted',
        requestId: 'xDh20cuGx'
      }
    };

    it('deletes request', () => {
      return expectSaga(watchDeleteRequest, RequestAPI)
        .provide([
          [matchers.call.fn(RequestAPI.deleteRequest, action.requestId), response]
        ])
        .put({
          type: 'DELETE_REQUEST_SUCCESS',
          deleteMessage: response.data.message,
          requestId: response.data.requestId
        })
        .dispatch({
          type: 'DELETE_REQUEST',
          requestId,
        })
        .run();
    });

    it('throws error if there is an error deleting a user\'s requests', () => {
      return expectSaga(watchDeleteRequest, RequestAPI)
        .provide([
          [matchers.call.fn(RequestAPI.deleteRequest, action.requestId), throwError(error)]
        ])
        .put({
          type: 'DELETE_REQUEST_FAILURE',
          error
        })
        .dispatch({
          type: 'DELETE_REQUEST',
          requestId
        })
        .run();
    });
  });
});
