import  updateUserProfile  from '../userProfileActions';

describe('Profile actions', () =>{
  const userProfileData = {
    passportName:'collins Njau',
    gender:'Male',
    occupation:'Software developer',
    manager:'Samuel Kubai',
    department:'Talent and development'
  };
  const userId = 'lftnskjdjsosna';
  const showToast = 'profile';

  it('should return UPDATE_USER_PROFILE', () =>{
    const expectedAction = {
      type: 'UPDATE_USER_PROFILE',
      userProfileData,
      userId,
      showToast
    };
    const profileAction = updateUserProfile(userProfileData, userId, showToast);
    expect(profileAction).toEqual(expectedAction);
  });
});
