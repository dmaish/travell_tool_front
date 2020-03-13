import React from 'react';
import { PropTypes } from 'prop-types';
import './_overlay.scss';

const Overlay = (props) => {
  const {className, click, children, overlayBackground} = props;
  return (
    <div
      role="button"
      tabIndex="0"
      onClick={click}
      onKeyPress={()=>{}}
      className={`overlay ${className} ${overlayBackground}`}
    >
      {children}
    </div>
  );
};

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  overlayBackground: PropTypes.string,
  click: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object, PropTypes.array
  ]).isRequired
};

Overlay.defaultProps = {
  click: null,
  overlayBackground: ''
};

export default Overlay;
