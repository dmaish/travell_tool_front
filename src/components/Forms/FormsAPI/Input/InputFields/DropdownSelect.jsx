import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import selectDropdownIcon from '../../../../../images/icons/form_select_dropdown.svg';
import DropdownOptions from './DropdownOptions';

export default class DropdownSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    value: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
  };

  static defaultProps = {
    className: '',
    error: ''
  };

  state = {
    dropdownOpen: false
  };

  getSelectOptions(choices) {
    return (
      <DropdownOptions
        items={choices}
        handleClick={this.handleOptClick}
        getDropdownStatus={this.getDropdownStatus}
      />
    );
  }

  getDropdownStatus = () => {
    const { dropdownOpen } = this.state;
    const dropdownStatus = dropdownOpen ? 'active' : 'inactive';
    return dropdownStatus;
  };

  getPropsObject = () => {
    const { className, error } = this.props;
    const _props = { ...this.props };
    ['labelNote', 'selectOptions', 'handleSelect', 'selectedDate'].map(
      item => delete _props[item]
    );

    const props = {
      ..._props,
      onClick: this.handleToggleDropdown,
      onKeyPress: () => {},
      role: 'button',
      tabIndex: '0',
      className: `input select ${error ? 'error' : ''} ${
        className ? className : ''
      }`
    };
    return props;
  };

  handleOptClick = choice => {
    const { onChange, handleDropDown } = this.props;
    onChange(choice);
    this.handleToggleDropdown();
    handleDropDown ? handleDropDown(this.props, choice) : null;
  };

  handleToggleDropdown = e => {
    const { dropdownOpen } = this.state;
    const { onClick } = this.props;
    onClick && onClick(e);
    this.setState(() => ({
      dropdownOpen: !dropdownOpen
    }));
  };

  valueToChoiceLabel = (choices, value) => {
    let choice =
      choices.filter(choice => {
        return (choice.value || choice) === value;
      })[0] || '';
    choice = !choice ? ' ' : choice;
    return choice.label || choice || value;
  };

  render() {
    const { choices, value, size } = this.props;
    const options = this.getSelectOptions(choices);
    return (
      <div style={{ position: 'relative' }}>
        <div {...this.getPropsObject()}>
          <div className="value" style={{ width: size }}>
            {this.valueToChoiceLabel(choices, value)}
            <div className={`select-dropdown ${this.getDropdownStatus()}`}>
              <img src={selectDropdownIcon} alt="icn" />
            </div>
          </div>
          {options}
        </div>
      </div>
    );
  }
}
