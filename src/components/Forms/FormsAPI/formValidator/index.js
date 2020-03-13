
function validate(field)  {
  const targetForm = this;
  let { values, errors, optionalFields } = targetForm.state;
  [errors, values] = [{ ...errors }, { ...values }];
  let hasBlankFields = false;
  let sameOriginDestination = true;

  hasBlankFields = Object.keys(values)
    .some(key => !values[key] && !isOptional(key, optionalFields));

  let strArray;
  let index;
  if (field != undefined){
    const str = field;
    strArray = str.split('-'); 
    index  = strArray[1];
  }
  
  if((values[`origin-${index}`] === values[`destination-${index}`])){
    if((values[`origin-${index}`] != '' || values[`destination-${index}`] != '')){
      errors[`origin-${index}`] = 'same origin and destination';
      errors[`destination-${index}`] = 'same origin and destination';
      targetForm.setState(prevState => ({ ...prevState, errors, hasBlankFields, sameOriginDestination }));
    }
  }else {
    sameOriginDestination = false;
    errors[`origin-${index}`] = '';
    errors[`destination-${index}`] = '';
    targetForm.setState(prevState => ({ ...prevState, errors, hasBlankFields, sameOriginDestination}));
  }

  if (!field){
    targetForm.setState({hasBlankFields});
    return !hasBlankFields;
  }

  !values[field] && !isOptional(field, optionalFields)
    ? (errors[field] = 'This field is required')
    : (errors[field] = '');
  targetForm.setState(prevState => ({ ...prevState, errors, hasBlankFields}));
  return !hasBlankFields;
}

const isOptional = (field, optionalFields) => {
  return optionalFields && optionalFields
    .some(expr => new RegExp(expr).test(field));
};


const getDefaultBlanksValidatorFor = (targetForm) => {
  return validate.bind(targetForm);
};

export default getDefaultBlanksValidatorFor;
