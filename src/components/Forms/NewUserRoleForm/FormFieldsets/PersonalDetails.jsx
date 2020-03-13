import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewUserRoleForm';

class PersonalDetailsFiedset extends Component {
  renderCenterField(roleName, renderInput) {
    if (roleName.toLowerCase() === 'travel team member') {
      return renderInput('center', 'dropdown-select',
        { required: true, className: 'request_dropdown' });
    }
    return renderInput('center', 'dropdown-select',
      {
        labelNote: '(Optional)',
        required: false,
        className: 'request_dropdown'
      });
  }
  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const { roleName, centers, myTitle } = this.props;
    const checkStatus = myTitle === 'Change Center';
    const centerLocations = centers && centers.map(center => center.location);
    formMetadata.dropdownSelectOptions.center = centerLocations;

    return (
      <fieldset className="personal-details">
        <div>
          <div style={{ paddingTop: '14px' }}>
            {renderInput('email', 'text', { disabled: checkStatus })}
          </div>
          <div>{centers && this.renderCenterField(roleName, renderInput)}</div>
        </div>
      </fieldset>
    );
  }
}

const roleName = PropTypes.string;
const centers = PropTypes.array;
const myTitle = PropTypes.string;

PersonalDetailsFiedset.propTypes = {
  roleName: roleName.isRequired,
  centers: centers.isRequired,
  myTitle: myTitle.isRequired
};

export default PersonalDetailsFiedset;
