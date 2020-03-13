import { put, takeLatest, call } from 'redux-saga/effects';
import toast from 'toastr';
import ProfileApi from '../../services/ProfileApi';
import apiErrorHandler from '../../services/apiErrorHandler';
import { UPDATE_USER_PROFILE } from '../constants/actionTypes';

export function* postUserProfileDataSagaAsync(action) {
  try {
    const response = yield call(
      ProfileApi.updateUserProfile,
      action.userProfileData,
      action.userId
    );
    if (action.showToast){
      toast.success('Profile updated successfully');
    }
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    if (errorMessage === 'occupation is required'){ /* istanbul ignore next */
      toast.error('The role you entered does not exist');
    }
    else {
      toast.error(errorMessage);
    }
  }
}


export function* watchUpdateUserProfileAsync() {
  yield takeLatest(UPDATE_USER_PROFILE, postUserProfileDataSagaAsync);
}
