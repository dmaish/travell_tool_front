import {UPDATE_USER_PROFILE}from '../constants/actionTypes';

const updateUserProfile = (userProfileData, userId, showToast) =>(
  {
    type: UPDATE_USER_PROFILE,
    userProfileData,
    userId,
    showToast
  });


export default updateUserProfile;
