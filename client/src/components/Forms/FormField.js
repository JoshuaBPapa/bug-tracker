import React from 'react';

import ValidationErr from './ValidationError';

const FormField = ({ children, title, valErr }) => (
  <div className="Form-Field">
    <label>
      <span className="form-title">{title}</span>
      {children}
    </label>
    {valErr ? <ValidationErr msg={valErr} /> : null}
  </div>
);

export default FormField;