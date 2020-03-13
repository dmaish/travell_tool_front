import React, { Component} from 'react';
import { PropTypes } from 'prop-types';

class FormContext extends Component {

  static childContextTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    targetForm: PropTypes.object.isRequired,
    validatorName: PropTypes.string
  }

  getChildContext() {
    const { errors, values, targetForm, validatorName } = this.props;
    return this.childContext({errors, values, targetForm, validatorName});
  }

  childContext = (args) => {
    return args;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}


const  errors = PropTypes.object;
const values = PropTypes.object;
const  targetForm = PropTypes.object;
const validatorName = PropTypes.string;
const  children = PropTypes.array;


FormContext.propTypes = {
  values: values.isRequired,
  errors: errors.isRequired,
  targetForm: targetForm.isRequired,
  validatorName: validatorName,
  children: children.isRequired
};

FormContext.defaultProps = {
  validatorName: 'validate'
};

export default FormContext;
