const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty field to String in order to validate them
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordCheck = !isEmpty(data.passwordCheck) ? data.passwordCheck : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name field is required.';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name field is required.';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required.';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }
  if (Validator.isEmpty(data.passwordCheck)) {
    errors.passwordCheck = 'Confirm password field is required.';
  }
  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
      errors.password = 'Password must be at least 6 characters';
  }
  if(!Validator.equals(data.password, data.passwordCheck)) {
    errors.passwordCheck = 'Passwwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}