import Validator from 'validator';
import lodash from 'lodash';

export default function validateLoginForm(data){
  let errors = {};
  if(Validator.isEmpty(data.username)){
    errors.username = 'This field is required';
  }
  if(Validator.isEmpty(data.password)){
    errors.password = 'This field is required';
  }
  return {
    errors,
    isValid: lodash.isEmpty(errors)
  }
}