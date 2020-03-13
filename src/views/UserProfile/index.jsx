import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import '../../components/Forms/NewRequestForm/NewRequestForm.scss';
import './UserProfile.scss';
import updateUserProfile from '../../redux/actionCreator/userProfileActions';
import ProfileForm from '../../components/Forms/ProfileForm';
import Base from '../Base';
import { fetchRoleUsers } from '../../redux/actionCreator/roleActions';
import { getOccupation } from '../../redux/actionCreator/occupationActions';
import {getUserData} from '../../redux/actionCreator/userActions';


class UserProfile extends Base {

  componentDidMount() {
    const { fetchRoleUsers, occupations, getOccupation } = this.props;
    fetchRoleUsers(53019);
    if (!occupations.length) {
      getOccupation();
    }
  }

  render() {
    const { roleUsers, updateUserProfile, user,
      fetchUserData, getUserData, occupations } = this.props;
    return (
      <Fragment>
        <h1>PROFILE</h1>
        <div className="main">
          <div className="main--user_profile">
            <ProfileForm
              managers={roleUsers}
              updateUserProfile={updateUserProfile}
              userData={fetchUserData && fetchUserData.result}
              user={user}
              getUserData={getUserData}
              occupations={occupations}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

UserProfile.defaultProps = {
  manager: []
};

export const mapStateToProps = ({ user, role, occupations}) => ({
  ...role,
  ...occupations,
  fetchUserData: user.getUserData
});

const actionCreators = {
  updateUserProfile,
  fetchRoleUsers,
  getOccupation,
  getUserData
};
export default connect(
  mapStateToProps,
  actionCreators
)(UserProfile);
