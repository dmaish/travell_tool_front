import React from 'react';
import { PropTypes } from 'prop-types';

const TextArea = (props) => {
  let textAreaProps = {...props};
  let { error } = props;
  let className = error ? 'error' : '';

  ['labelNote', 'toggleOptions', 'activeOption', 'selectedDate', 'error']
    .map(i => delete textAreaProps[i]); // onChange has been included in htmlProps

  return (
    <textarea
      rows="10"
      {...textAreaProps}
      className={`${className} textarea-box ${textAreaProps.className}`}
    />
  );
};

TextArea.propTypes = {
  error: PropTypes.string
};

TextArea.defaultProps = {
  error: ''
};

export default TextArea;
