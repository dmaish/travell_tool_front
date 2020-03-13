import * as actionTypes from '../../constants/actionTypes';
import * as actionCreator from '../actionCreators';

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
  isAuthenticated: false,
  user: {},
  error: true
};

describe('Test for auth action', () => {
  it('create an action SET_CURRENT_USER to set user in store', (done) => {
    expect(actionCreator.setCurrentUser().type).
      toEqual('SET_CURRENT_USER');
    done();
  });

  it('create an action to SET_CURRENT_USER_SUCCESS to redux store', (done) => {
    expect(actionCreator.setCurrentUserSuccess(res).type).
      toEqual(actionTypes.SET_CURRENT_USER_SUCCESS);
    done();
  });

  it('create an action to SET_CURRENT_USER_FAILURE to redux store', (done) => {
    expect(actionCreator.setCurrentUserFailure(error).type).
      toEqual(actionTypes.SET_CURRENT_USER_FAILURE);
    done();
  });
});
