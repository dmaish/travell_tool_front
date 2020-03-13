import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import CentersAPI from '../../../services/CentersAPI';
import { watchFetchCenters, watchUpdateUserCenterAsync } from '../centersSaga';

const error = {
  response: {
    data: {
      error: 'An error occurred'
    }
  }
};

const userId = 1;

const response = {
  data: {
    centers: [
      {
        id: 1,
        location: 'Lagos, Nigeria'
      },
      {
        id: 2,
        location: 'Nairobi, Kenya'
      }
    ]
  }
};

const response11 = {
  data: {
    newCenter: {
      center: 'New York, USA'
    }
  }
};


const action = {
  newCenter: {
    center: 'New York, USA'
  }
};
describe('Centers Saga', () => {
  it('fetches centers', () => {
    return expectSaga(watchFetchCenters, CentersAPI)
      .provide([[matchers.call.fn(CentersAPI.fetchCenters), response]])
      .put({
        type: 'FETCH_CENTERS_SUCCESS',
        centers: response.data.centers
      })
      .dispatch({
        type: 'FETCH_CENTERS'
      })
      .run();
  });
  it('throws error if there is an error fetching a user\'s requests', () => {
    return expectSaga(watchFetchCenters, CentersAPI)
      .provide([[matchers.call.fn(CentersAPI.fetchCenters), throwError(error)]])
      .put({
        type: 'FETCH_CENTERS_FAILURE',
        error: error.response.data.error
      })
      .dispatch({
        type: 'FETCH_CENTERS'
      })
      .run();
  });

  describe('Update user center  Saga', () => {
    it('update user centers', () => {
      return expectSaga(watchUpdateUserCenterAsync, CentersAPI)
        .provide([[call(CentersAPI.updateUserCenter, userId,
          action.newCenter
        ),  response11]])
        .put({
          type: 'UPDATE_USER_CENTER_SUCCESS',
          userCenter: response11.data
        })
        .dispatch({
          type: 'UPDATE_USER_CENTER',
          userId,
          newCenter: {
            center: 'New York, USA'
          }
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchUpdateUserCenterAsync, CentersAPI)
        .provide([
          [
            matchers.call.fn(CentersAPI.updateUserCenter, 1, action.newCenter),
            throwError(error)
          ]
        ])
        .put({
          type: 'UPDATE_USER_CENTER_FAILURE',
          error: error.response.data.error
        })
        .dispatch({
          type: 'UPDATE_USER_CENTER'
        })
        .run();
    });
  });
});
