import React from 'react';

import ValidationErr from './ValidationError';

const FormField = ({ children, title, valErr }) => (
  <div>
    <label>
      {title}
      {children}
    </label>
    {valErr ? <ValidationErr msg={valErr} /> : null}
  </div>
);

export default FormField;