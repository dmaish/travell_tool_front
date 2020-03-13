import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import error from '../../../../images/error.svg';
import * as MaintanceFormMetadata from '../../FormsMetadata/MaintanceFormMetadata';

class MaintainanceFieldSets extends Component {
  render() {
    this.inputRenderer = new InputRenderer(MaintanceFormMetadata);
    const { renderInput } = this.inputRenderer;
    const { values: { maintainanceStart, maintainanceEnd, reason }, editMaintenance } = this.props;
    const {maintenance} = editMaintenance;

    return (
      <fieldset className="maintainance-details">
        <div className="input-group">
          {renderInput('maintainanceStart', 'date',
            {
              value: (maintenance && maintenance.start) ? maintenance.start : maintainanceStart,
              minDate: new Date()
            })}
          {renderInput('maintainanceEnd', 'date',
            {
              value: (maintenance && maintenance.end) ? maintenance.end : maintainanceEnd,
              minDate: moment(new Date(maintainanceStart))
            })}
          {renderInput('reason', 'text', {value: (maintenance && maintenance.reason) ? maintenance.reason : reason })}
        </div>
        <span className="msg-maintainence">
          <img src={error} alt="error" className="img_error" />
          This room will be unavailable for booking by guests
        </span>
      </fieldset>
    );
  }
}

MaintainanceFieldSets.propTypes = {
  values: PropTypes.object,
  editMaintenance: PropTypes.object
};

MaintainanceFieldSets.defaultProps = {
  values: {},
  editMaintenance: {}
};

export default MaintainanceFieldSets;
