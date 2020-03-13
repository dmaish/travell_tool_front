import {
  fetchReadiness,
  fetchReadinessSuccess,
  fetchReadinessFailure
} from '../travelReadinessActions';
import { fetchReadinessResponse } from '../../__mocks__/mocks';

describe('Travel Readiness Action', () => {
  it('should return action type of FETCH_TRAVEL_READINESS and payload', () => {
    const query = {
      page: '1',
      limit: '6',
      type: 'json'
    };
    const expectedAction = {
      type: 'FETCH_TRAVEL_READINESS',
      query
    };
    const createdAction = fetchReadiness(query);
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type of FETCH_TRAVEL_READINESS_SUCCESS and payload', () => {
    const expectedAction = {
      type: 'FETCH_TRAVEL_READINESS_SUCCESS',
      response: fetchReadinessResponse.readiness
    };
    const createdAction = fetchReadinessSuccess(fetchReadinessResponse.readiness);
    expect(createdAction).toEqual(expectedAction);
  });
  it('should return action type of FETCH_TRAVEL_READINESS_FAILURE and payload', () => {
    const error = 'type must be \'json\' or \'file\'';
    const expectedAction = {
      type: 'FETCH_TRAVEL_READINESS_FAILURE',
      error
    };
    const createdAction = fetchReadinessFailure(error);
    expect(createdAction).toEqual(expectedAction);
  });
});
