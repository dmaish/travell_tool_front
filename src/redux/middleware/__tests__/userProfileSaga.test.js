import { call } from 'redux-saga/effects';
import moxios from 'moxios';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import ProfileApi from '../../../services/ProfileApi';
import {watchUpdateUserProfileAsync, postUserProfileDataSagaAsync} from '../UserProfileSaga';




describe('Profile saga', () =>{
  const action = {
    UserProfile :{
      passportName:'Collins Merita',
      department:'Talent development',
      occupation:'software developer',
      gender:'Male',
      manager:'samuel'
    },
    userId:'JFENDVNDK',
    showToast:true,
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });
  const baseUrl = 'http://127.0.0.1:5000/api/v1';
  const id = 'JFENDVNDK';


  it('updates use profile data', () =>{
    moxios.stubRequest(`${baseUrl}/user/${id}/profile`, {
      status: 201,
      response:{
        passportName:'Collins Merita',
        department:'Talent development',
        occupation:'software developer',
        gender:'Male',
        manager:'samuel'
      }
    });
    return expectSaga(watchUpdateUserProfileAsync, ProfileApi)
      .provide([[call(ProfileApi.updateUserProfile, action.id), action.UserProfile]])
      .dispatch({
        type: 'UPDATE_USER_PROFILE',
        response: action.UserProfile,
        userId:action.userId,
        showToast: action.showToast
      })
      .run();
  });

  it('should test invalid role', () => {
    const error = {
      response: {
        status: 422,
        data: {
          message: 'The role you entered does not exist',
        }
      }
    };
    moxios.stubRequest(`${baseUrl}/user/${id}/profile`, {
      status: 422,
      response: {
        status: 422,
        errors: [{
          message: 'The role you entered does not exist',
        }]
      }
    });
    return expectSaga(watchUpdateUserProfileAsync, ProfileApi)
      .provide([[call(ProfileApi.updateUserProfile, action.id), throwError(error)]])
      .dispatch({
        type: 'UPDATE_USER_PROFILE',
        response: action.UserProfile,
        userId:action.userId,
        showToast: action.showToast
      })
      .run();
  });
});


