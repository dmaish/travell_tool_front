import * as actionTypes from '../../constants/actionTypes';
import authReducer from '../auth';

const res = {
  isAuthenticated: true,
  user: {
    id: 1,
    firstName: 'tomato',
    lastName: 'Egg',
    image: 'http://www.imageurl.com/gif'
  },
  error: false
};


const error = {
  error: true
};

describe('Auth Reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: false
  };

  it('should return proper initial state', (done) => {
    expect(authReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('dispatches action SET_CURRENT_USER_SUCCESS', (done) => {
    const action = {
      type: actionTypes.SET_CURRENT_USER_SUCCESS,
      response: res
    };
    const newState = authReducer({}, action);
    expect(newState).toEqual(res);
    done();
  });

  it('dispatches action SET_CURRENT_USER', (done) => {
    const action = {
      type: actionTypes.SET_CURRENT_USER_FAILURE,
      response: error
    };
    const newState = authReducer({}, action);
    expect(newState).toEqual(error);
    done();
  });
});
