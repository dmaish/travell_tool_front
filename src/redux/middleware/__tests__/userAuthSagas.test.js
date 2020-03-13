import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { userDetails } from '../../../helper/userDetails';
import { userAuth } from '../userAuthSagas';

const response = {
  user: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        id: 'LHlGhZ',
        first_name: 'Bibo',
        last_name: 'lili',
        firstName: 'jAMES',
        lastName: 'dOE',
        email: 'jame.doe@andela.com',
        name: 'jame Sundoeday',
        picture: 'https://lh6.googleusercontent.com'
      }
    }
  }
};
const error = 'no token';
describe('Auth Saga', () => {
  describe('returns error when data is not available  saga', () => {
    it('throws error if no token is found', () => {
      return expectSaga(userAuth, response)
        .provide([[call(userDetails), throwError(error)]])
        .put({
          type: 'SET_CURRENT_USER_FAILURE',
          error
        })
        .dispatch({
          type: 'SET_CURRENT_USER'
        })
        .run();
    });
  });
});
