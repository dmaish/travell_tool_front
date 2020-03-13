import {
  fetchCenters,
  fetchCentersSuccess,
  fetchCentersFailure,
  updateUserCenter,
  updateUserSuccess,
  updateUserFailure
} from '../centersActions';

const centersResponse = {
  data: {
    centers: [{
      id: 1,
      location: 'Lagos, Nigeria'
    },
    {
      id: 2,
      location: 'Nairobi, Kenya'
    }]
  }
};
describe('Centers Actions', () => {
  describe('Fetch centers', () => {
    it('should return action type FETCH_CENTERS', () => {
      const expectedAction = {
        type: 'FETCH_CENTERS',
      };
      const createdAction = fetchCenters();
      expect(createdAction).toEqual(expectedAction);
    });
    it('should return action type FETCH_CENTERS_SUCCESS', () => {
      const { centers } = centersResponse.data;
      const expectedAction = {
        type: 'FETCH_CENTERS_SUCCESS',
        centers: centers
      };
      const newAction = fetchCentersSuccess(centersResponse.data);
      expect(newAction).toEqual(expectedAction);
    });
    it('should return action type FETCH_CENTERS_FAILURE', () => {
      const error = 'An error occurred. Please reload page';
      const expectedAction = {
        type: 'FETCH_CENTERS_FAILURE',
        error
      };
      const newAction = fetchCentersFailure(error);
      expect(newAction).toEqual(expectedAction);
    });
  });

  describe('Update user center', () => {
    it('should return action type UPDATE_USER_CENTER', () => {
      const expectedAction = {
        type: 'UPDATE_USER_CENTER',
      };
      const createdAction = updateUserCenter();
      expect(createdAction).toEqual(expectedAction);
    });

    it('should return action type UPDATE_USER_CENTER_SUCCESS', () => {
      const expectedAction = {
        type: 'UPDATE_USER_CENTER_SUCCESS',
        userCenter: centersResponse.data
      };
      const newAction = updateUserSuccess(centersResponse.data);
      expect(newAction).toEqual(expectedAction);
    });

    it('should return action type UPDATE_USER_CENTER_FAILURE', () => {
      const error = 'An error occurred. Please reload page';
      const expectedAction = {
        type: 'UPDATE_USER_CENTER_FAILURE',
        error
      };

      const newAction = updateUserFailure(error);
      expect(newAction).toEqual(expectedAction);
    });

  });
});
