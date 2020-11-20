import React from 'react';

import AuthorisationLevel from '../AuthorisationLevel/AuthorisationLevel';
import Status from '../Status/Status';
import Priority from '../Priority/Priority';
import ValidationErr from './ValidationError';

const FormField = ({ field, value, changed, validationError }) => {
  let formFieldContent;
  if (field.element === 'input') {
    formFieldContent = (
      <input
        value={value}
        type={field.type}
        onChange={e => changed(e.target.value, field.key)} />
    );
  } else if (field.element === 'select') {
    let options;
    if (field.key === 'authLevel') {
      options = field.options.map(option => (
        <AuthorisationLevel
          key={option}
          value={option}
          isOption={true} />
      ));
    } else if (field.key === 'status') {
      options = field.options.map(option => (
        <Status
          key={option}
          value={option}
          isOption={true} />
      ));
    } else if (field.key === 'priority') {
      options = field.options.map(option => (
        <Priority
          key={option}
          value={option}
          isOption={true} />
      ));
    } else {
      options = field.options;
    }

    formFieldContent = (
      <select
        value={value}
        onChange={e => changed(e.target.value, field.key)}>
        {options}
      </select>
    );
  } else if (field.element === 'textArea') {
    formFieldContent = (
      <textarea
        value={value}
        onChange={e => changed(e.target.value, field.key)} />
    )
  }

  return (
    <div className="Form-Field">
      <label>
        <span className="form-title">{field.title}</span>
        {formFieldContent}
      </label>
      {validationError ? <ValidationErr msg={validationError} /> : null}
    </div>
  );
};

export default FormField;