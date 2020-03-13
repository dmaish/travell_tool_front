import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import icon from './images/drop-down-icon.svg';
import './SelectDropdown.scss';

class SelectDropDown extends PureComponent {
  state = {
    isDropdownOpen: false,
    selectedItem: {}
  };

  componentWillMount() {
    const { defaultSelected, dropDownItems } = this.props;
    const selectedItem = dropDownItems.find(item => item.value == defaultSelected)
      || dropDownItems[0];
    this.setState(state => ({...state, selectedItem}));
  }

  selectItem = item => {
    this.setState({
      selectedItem: item
    });
  };

  showDropdownItems = () => {
    this.setState({
      isDropdownOpen: true
    });
    document.addEventListener('click', this.hideDropdownItems);
  };

  hideDropdownItems = () => {
    this.setState({
      isDropdownOpen: false
    });
    document.removeEventListener('click', this.hideDropdownItems);
  };

  handleItemClick = item => {
    const { onClickItem } = this.props;
    this.selectItem(item);
    onClickItem(item.value);
  };

  checkSelected = (item) => {
    const { selectedItem } = this.state;
    const isSelected = selectedItem.value === item.value ?
      'selected': '';
    return isSelected;
  }

  renderDropDownItems(dropDownItems) {
    return (
      <ul className="dropdown__list__items">
        {dropDownItems.map(item => (
          <li
            id={`${item.name}-${item.value}`}
            key={item.value}
            className={`dropdown__list__item ${this.checkSelected(item)}`}
            onClick={() => this.handleItemClick(item)}
            role="presentation">
            {item.value}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { dropDownIcon, dropDownItems } = this.props;
    const { isDropdownOpen, selectedItem } = this.state;
    return (
      <div
        className={`dropdown__container ${isDropdownOpen ? 'open' : ''}`}
        role="presentation"
        onClick={() => this.showDropdownItems()}
      >
        <div
          className={`dropdown__input ${isDropdownOpen ? 'clicked' : ''}`}
        >
          <div className="dropdown__input__value">
            {selectedItem.name}
          </div>
          <img
            src={dropDownIcon}
            alt="dropdown-icon"
          />
        </div>

        <div className="dropdown__list">
          {this.renderDropDownItems(dropDownItems)}
        </div>
      </div>
    );
  }
}

SelectDropDown.propTypes = {
  dropDownIcon: PropTypes.string,
  onClickItem: PropTypes.func,
  dropDownItems: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  defaultSelected: PropTypes.string,
};

SelectDropDown.defaultProps = {
  dropDownIcon: icon,
  defaultSelected: '',
  onClickItem: null,
};

export default SelectDropDown;
