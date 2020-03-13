// import * as actionTypes from '../../constants';
import userReducer from '../user';
import * as actionTypes from '../../constants/actionTypes';

const res = {
  success: true,
  message: 'data',
  result: {
    id: 1,
    fullName: 'captain america',
    email: 'captain.america@andela.com',
    userId: 'JFENDVNDK',
    createdAt: '2018-09-03T17:09:05.824Z',
    updatedAt: '2018-09-03T17:09:05.824Z',
    roleId: 401938,
    roles: [{
      roleName: 'Requester',
      description: 'Can make travel request'
    }]
  }
};

const user = {
  fullName: 'hulk smash',
  email: 'hulk.smash@andela.com',
  userId: '-121323'
};

describe('User Reducer', () => {
  const initialState = {
    postUserData: [],
    getUserData: {},
    currentUser: {},
    errors: [],
    getCurrentUserRole: [],
    isLoaded: false
  };

  it('should return proper initial state', done => {
    expect(userReducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ROLE_DATA', done => {
    const action = {
      type: actionTypes.GET_USER_DATA
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action GET_ROLE_DATA_SUCCESS:', done => {
    const action = {
      type: actionTypes.GET_USER_DATA_SUCCESS,
      response: res,
    };
    const newState = userReducer(initialState, action);
    expect(newState.getUserData).toEqual(res);
    done();
  });

  it('dispatches action GET_ROLE_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.GET_USER_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = userReducer(initialState, action);
    expect(newState.errors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });

  it('dispatches action POST_USER_DATA', done => {
    const action = {
      type: actionTypes.POST_USER_DATA
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(initialState);
    done();
  });

  it('dispatches action POST_USER_DATA_SUCCESS', done => {
    const action = {
      type: actionTypes.POST_USER_DATA_SUCCESS,
      userData: user
    };
    const newState = userReducer(initialState, action);
    expect(newState.postUserData).toEqual(user);
    done();
  });

  it('dispatches action POST_USER_DATA_FAILURE', done => {
    const action = {
      type: actionTypes.POST_USER_DATA_FAILURE,
      error: 'Possible network error, please reload the page'
    };
    const newState = userReducer(initialState, action);
    expect(newState.errors).toEqual(
      'Possible network error, please reload the page'
    );
    done();
  });
});
