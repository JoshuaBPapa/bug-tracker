import React from 'react';

const FormError = ({ error }) => {
  let formError;
  if (error.hasOwnProperty('validationErrors')) {
    formError = 'There was an error with the data you entered. Please review it.';
  } else {
    formError = error;
  }

  return (
    <div>
      {formError}
    </div>
  );
};

export default FormError;