import React from 'react';
import { PropTypes } from 'prop-types';

const DropdownOptions = (props) => {
  const { items, handleClick, getDropdownStatus } = props;
  const choiceList = items
    .map((item) => (
      <li id="choice" key={item.value || item}>
        <div
          id="choice"
          onClick={()=>handleClick(item.value || item)}
          onKeyPress={()=>{}}
          role="button"
          tabIndex="0"
        >
          {item.label || item}
        </div>
      </li>
    ));
  return (
    <ul className={`select-menu select-menu--${getDropdownStatus()}`}>
      {choiceList}
    </ul>
  );
};

DropdownOptions.propTypes = {
  items: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  getDropdownStatus: PropTypes.func.isRequired,
};

export default DropdownOptions;
