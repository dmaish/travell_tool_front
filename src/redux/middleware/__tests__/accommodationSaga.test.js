import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import toast from 'toastr';
import AccommodationAPI from '../../../services/AccommodationAPI';
import {
  watchFetchAccommodation,
  watchEditAccommodation,
  watchFetchDisabledAccommodation,
  watchDisableAccommodation,
  watchRestoreDisabledAccommodation
} from '../accommodationSaga';
import guestHouses from '../../../views/Accommodation/__mocks__/mockData/guestHouses';
import disabledGuestHouses from '../../../views/Accommodation/__mocks__/mockData/disabledGuestHouses';
import { EDIT_ACCOMMODATION_DATA_SUCCESS, EDIT_ACCOMMODATION_DATA, EDIT_ACCOMMODATION_DATA_FAILURE } from '../../constants/actionTypes';

const response = {
  data: {
    guestHouses,
    success: true,
    message: 'Successfully retrieved guestHouses'
  }
};
const error = 'Possible network error, please reload the page';

toast.error = jest.fn();
toast.success = jest.fn();

describe('Accommodation Saga', () => {
  describe('Fetch Accommodation saga', () => {
    it('fetches accommodation centres', () => {
      return expectSaga(watchFetchAccommodation, AccommodationAPI)
        .provide([[call(AccommodationAPI.getAccommodationCentres), response]])
        .put({
          type: 'FETCH_ACCOMMODATION_CENTRES_SUCCESS',
          guestHouses: response.data.guestHouses
        })
        .dispatch({
          type: 'FETCH_ACCOMMODATION_CENTRES'
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchFetchAccommodation, AccommodationAPI)
        .provide([
          [call(AccommodationAPI.getAccommodationCentres), throwError(error)]
        ])
        .put({
          type: 'FETCH_ACCOMMODATION_CENTRES_FAILURE',
          error
        })
        .dispatch({
          type: 'FETCH_ACCOMMODATION_CENTRES'
        })
        .run();
    });
  });

  describe('Fetch Disabled Accommodation saga', () => {
    const response = {
      data: {
        guestHouses: disabledGuestHouses,
        success: true,
        message: 'Disabled guesthouses retrieved successfully'
      }
    };
    it('fetches disabled accommodation centres', () => {
      return expectSaga(watchFetchDisabledAccommodation, AccommodationAPI)
        .provide([[call(AccommodationAPI.getDisabledAccommodations), response]])
        .put({
          type: 'FETCH_DISABLED_ACCOMMODATION_SUCCESS',
          disabledGuestHouses: response.data.guestHouses
        })
        .dispatch({
          type: 'FETCH_DISABLED_ACCOMMODATION'
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchFetchDisabledAccommodation, AccommodationAPI)
        .provide([
          [call(AccommodationAPI.getDisabledAccommodations), throwError(error)]
        ])
        .put({
          type: 'FETCH_DISABLED_ACCOMMODATION_FAILURE',
          error
        })
        .dispatch({
          type: 'FETCH_DISABLED_ACCOMMODATION'
        })
        .run();
    });
  });

  describe('Disable Accommodation saga', () => {
    const guestHouseId = '78yuhk8iu';
    const response = {
      data: {
        result: {
          id: '78yuhk8iu',
          houseName: 'Somolu Falls',
        },
        success: true,
      }
    };
    it('disables a guesthouse', () => {
      return expectSaga(watchDisableAccommodation)
        .provide([[call(AccommodationAPI.disableOrRestoreAccommodation, guestHouseId), response]])
        .put({
          type: 'DISABLE_ACCOMMODATION_SUCCESS',
          disabledGuestHouseData: {
            id: '78yuhk8iu',
            houseName: 'Somolu Falls',
          }
        })
        .dispatch({
          type: 'DISABLE_ACCOMMODATION',
          guestHouseId
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchDisableAccommodation)
        .provide([
          [call(AccommodationAPI.disableOrRestoreAccommodation), throwError(error)]
        ])
        .put({
          type: 'DISABLE_ACCOMMODATION_FAILURE',
          error
        })
        .dispatch({
          type: 'DISABLE_ACCOMMODATION',
          guestHouseId: 'hinlmknk'
        })
        .run();
    });
  });

  describe('Restore disabled Accommodation saga', () => {
    const guestHouseId = '78yuhk8iu';
    const response = {
      data: {
        result: {
          id: '78yuhk8iu',
          houseName: 'Somolu Falls',
        },
        success: true,
      }
    };
    it('restores a disabled guesthouse', () => {
      return expectSaga(watchRestoreDisabledAccommodation)
        .provide([[call(AccommodationAPI.disableOrRestoreAccommodation, guestHouseId), response]])
        .put({
          type: 'RESTORE_DISABLED_ACCOMMODATION_SUCCESS',
          restoredGuestHouseData: {
            id: '78yuhk8iu',
            houseName: 'Somolu Falls',
          }
        })
        .dispatch({
          type: 'RESTORE_DISABLED_ACCOMMODATION',
          guestHouseId,
        })
        .run();
    });

    it('throws error if there is an error fetching a user\'s requests', () => {
      return expectSaga(watchRestoreDisabledAccommodation)
        .provide([
          [call(AccommodationAPI.disableOrRestoreAccommodation), throwError(error)]
        ])
        .put({
          type: 'RESTORE_DISABLED_ACCOMMODATION_FAILURE',
          error
        })
        .dispatch({
          type: 'RESTORE_DISABLED_ACCOMMODATION',
          guestHouseId: 'hinlmknk',
        })
        .run();
    });
  });
});
