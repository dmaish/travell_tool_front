import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import expand from '../../../../images/expand_more_24px.svg';
import Checkbox from '../../../CheckBox/index';

class PersonalDetailsFieldset extends Component {
  state = {
    disableInputs: ''
  };
  handleDisableInputs = value => {
    const newState = value === 'clicked' ? 'disable-details' : '';
    this.setState({
      disableInputs: newState
    });
  };
  renderfields = collapse => {
    const { disableInputs } = this.state;
    const { values, value, managers, occupations } = this.props;
    const managerChoices = managers.map(manager => ({
      label: manager.fullName,
      value: manager.fullName // FIXME: use manager.email when the backend starts storing requests and approvals with manager's email rather than name
    }));
    const occupationsNames = occupations.map(
      occupation => occupation.occupationName
    );
    const { renderInput } = this.inputRenderer;
    const disabled = disableInputs;
    return (
      <div>
        {!collapse ? (
          <div>
            <div className={`input-group ${disabled}`}>
              <div className="spaces">{renderInput('name', 'text')}</div>
              <div className="spaces">
                {renderInput('gender', 'button-toggler')}
              </div>
              {renderInput('department', 'dropdown-select', { size: value, className: 'request_dropdown'})}
            </div>
            <div className={`input-group ${disabled}`}>
              <div className="spaces">
                {renderInput('role', 'filter-dropdown-select', {
                  choices: occupationsNames,
                  size: value,
                  className: 'request_dropdown'
                })}
              </div>
              <div className="spaces">
                {renderInput('manager', 'dropdown-select', {
                  choices: managerChoices,
                  size: value
                })}
              </div>
            </div>
            <div className="input-group">
              <Checkbox
                values={values}
                handleDisableInputs={this.handleDisableInputs}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const { collapsible, collapse, title, position, line, values } = this.props;
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;

    const disabledFields =
      values.state === 'clicked' ? 'disable-details' : null;
    return (
      <fieldset className={`personal-details ${disabledFields}`}>
        <legend
          style={{
            width: '100%',
            borderBottom: line,
            fontFamily: 'DIN Pro Medium',
            fontSize: '18px',
            paddingTop: '12px'
          }}>
          Personal Details
          <span className="required-field">* Required Field</span>
          <span
            className="hide-details"
            onClick={collapsible}
            onKeyPress={this.handleKeyDown}
            role="button"
            tabIndex={0}
            style={{ outline: 'none' }}>
            <img src={expand} alt="clicked" className="expand" style={{ transform: position }} />
            {!title ? 'Hide Details' : title}
          </span>
        </legend>
        {this.renderfields(collapse)}
      </fieldset>
    );
  }
}

const managers = PropTypes.array;
const collapsible = PropTypes.func;
const collapse = PropTypes.bool;
const title = PropTypes.string;
const position = PropTypes.string;
const line = PropTypes.string;
const values = PropTypes.object;
const occupations = PropTypes.array;

PersonalDetailsFieldset.propTypes = {
  managers: managers.isRequired,
  collapsible: collapsible.isRequired,
  collapse: collapse.isRequired,
  title: title.isRequired,
  position: position.isRequired,
  line: position.isRequired,
  values: values,
  value: PropTypes.string,
  occupations
};

PersonalDetailsFieldset.defaultProps = {
  values: {},
  value: '',
  occupations: []
};

export default PersonalDetailsFieldset;
