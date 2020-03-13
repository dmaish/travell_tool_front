import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewProfileMetadata';

class ProfileDetailsFieldSets extends Component {

  render() {
    const { managers, occupations } = this.props;



    const occupationsNames = occupations.map(occupation =>
      occupation.occupationName);

    const managerNames = managers.map(manager => manager.fullName);
    formMetadata.dropdownSelectOptions.manager = managerNames;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;



    return (
      <fieldset className="personal-details">
        <div className="legend">
          <span className="personal-details-text">
          Personal Details
          </span>
          <span className="required-field">
          * Required Field
          </span>
        </div>
        <div className="input-group profile-input">
          {renderInput('name', 'text')}
          {renderInput('gender', 'button-toggler')}
          {renderInput('role', 'filter-dropdown-select', {
            choices: occupationsNames,
            className: 'profile_role_dropdown'
          })}
          {renderInput('department', 'dropdown-select', {className: 'profile_dropdown'})}
          {renderInput('manager', 'dropdown-select', {className: 'profile_dropdown'})}
        </div>
      </fieldset>
    );
  }
}
ProfileDetailsFieldSets.propTypes = {
  managers: PropTypes.array,
  occupations: PropTypes.array,
};
ProfileDetailsFieldSets.defaultProps = {
  managers: [],
  occupations: []
};

export default ProfileDetailsFieldSets;
