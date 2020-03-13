import { call, put } from 'redux-saga/effects';
import AccommodationAPI from '../../../services/AccommodationAPI';
import { fetchGuestHouseTimelineDataSaga } from '../accommodationSaga';

const mockApiSuccessResponse = {
  data: {
    guestHouse: {
      houseName: 'Mini Flat'
    }
  }
};

const testServerError = {
  response: {
    status: 500
  }
};

describe('fetchGuestHouseTimelineDataSaga', () => {
  let sagaGenerator, action;
  beforeEach(() => {
    action = {
      guestHouseId: 'test-id',
      startDate: '2018-01-01',
      endDate: '2018-01-15'
    };
    sagaGenerator = fetchGuestHouseTimelineDataSaga(action);
  });

  it('calls the API service with the right arguments', () => {
    expect.assertions(2);
    const { done, value } = sagaGenerator.next();
    expect(done).toBe(false);
    const { fetchTimelineData } = AccommodationAPI;
    const { guestHouseId, startDate, endDate } = action;
    expect(value).toEqual(call(fetchTimelineData, guestHouseId, startDate, endDate));
  });

  it('dispatches the correct action with API response', () => {
    expect.assertions(2);
    sagaGenerator.next();
    const { done, value } = sagaGenerator.next(mockApiSuccessResponse);
    expect(done).toBe(false);
    expect(value).toEqual(put({
      type: 'FETCH_TIMELINE_DATA_SUCCESS',
      guestHouse: mockApiSuccessResponse.data.guestHouse
    }));
  });

  it('dispatches an error action when an API call is unsuccessful', () => {
    sagaGenerator.next();
    const { value } = sagaGenerator.throw(testServerError);
    expect(value).toEqual(put({
      type: 'FETCH_TIMELINE_DATA_FAILURE',
      guestHouse: {rooms: [] },
      error: 'Server error, try again'
    }));
  });
});
