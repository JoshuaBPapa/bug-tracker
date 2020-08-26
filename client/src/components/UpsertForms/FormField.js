import React from 'react';

import Status from '../Status/Status';
import Priority from '../Priority/Priority';

const FormField = ({ type, name, value, changed, options }) => {
  const commonAttributes = {
    name: name,
    value: value,
    onChange: changed
  };

  let field;
  if (type === 'input') {
    field = <input type="text" {...commonAttributes} />
  } else if (type === 'text area') {
    field = <textarea {...commonAttributes} />
  } else if (type === 'select') {
    field = (
      <select {...commonAttributes}>
        {options.map(option => (
          name === 'status' ? (
            <Status key={option} value={option} isOption={true} />
          ) : name === 'priority' ? (
            <Priority key={option} value={option} isOption={true} />
          ) : null
        ))}
      </select>
    );
  };

  return (
    <label>
      {name}
      {field}
    </label>
  );
};

export default FormField;