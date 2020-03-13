import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import AccommodationAPI from '../../../services/AccommodationAPI';
import {
  watchCreateAccommodationSagaAsync,
} from '../accommodationSaga';
import { guestHouse, response } from '../../__mocks__/AccommodationData';

const accommodationData = guestHouse;

const error = 'Possible network error, please reload the page';
const action = {
  accommodationData: guestHouse
};

describe('Accommodation Saga', () => {
  describe('create  accommodation', () => {

    it('fails to create Accommodation ', () => {
      return expectSaga(watchCreateAccommodationSagaAsync)
        .provide([
          [call(AccommodationAPI.postAccommodation, action.accommodationData), throwError(error)]])
        .put({
          type: 'CREATE_ACCOMMODATION_DATA_FAILURE',
          error: error,
        })
        .dispatch({
          type: 'CREATE_ACCOMMODATION_DATA',
          accommodationData
        })
        .run();
    });
  });

  it('create Accommodation ', () => {
    return expectSaga(watchCreateAccommodationSagaAsync)
      .provide([
        [call(AccommodationAPI.postAccommodation, action.accommodationData), response]])
      .put({
        type: 'CREATE_ACCOMMODATION_DATA_SUCCESS',
        accommodationData: response.data,
      })
      .dispatch({
        type: 'CREATE_ACCOMMODATION_DATA',
        accommodationData
      })
      .run();
  });

});
