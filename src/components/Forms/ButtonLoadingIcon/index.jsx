import React from 'react';
import PropTypes from 'prop-types';

const ButtonLoadingIcon = ({ isLoading, buttonText }) => (
  <React.Fragment>
    { isLoading && <i className="loading-icon" /> }
    {' '}
    { buttonText }
  </React.Fragment>
);

ButtonLoadingIcon.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ButtonLoadingIcon;
