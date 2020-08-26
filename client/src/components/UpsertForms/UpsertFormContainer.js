import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FormField from './FormField';
import ValidationError from './ValidationError';

import useAxios from '../../hooks/useAxios';

const UpsertFormContainer = ({ formFields, dbTable, editId, assignedProjectId }) => {
  let initFormData = {};
  formFields.forEach(field => {
    const { name, initValue } = field;
    initFormData[name] = initValue;
  });
  const [formData, setFormData] = useState(initFormData);
  const { loading, data, error, sendData } = useAxios();
  const history = useHistory();

  useEffect(() => {
    // send the user to the created/updated item's page on success
    if (data) {
      history.push(`/${dbTable}s/${dbTable}/${data.id}`);
    };
  }, [data, history, dbTable]);

  const handleSubmit = e => {
    e.preventDefault();
    
    if (editId) {
      sendData(`${dbTable}s/${editId}`, 'PUT', formData)
    } else {
      if (dbTable === 'ticket') {
        sendData(`tickets/${assignedProjectId}`, 'POST', formData);
      } else if (dbTable === 'project') {
        sendData(`projects`, 'POST', formData);
      };
    };
  };

  const handleChange = e => {
    const { target: { name, value } } = e;
    setFormData(prevState => {
      const updatedState = { ...prevState };
      updatedState[name] = value;

      return updatedState;
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <div key={field.name}>
            <FormField
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              changed={handleChange}
              options={field.options} />
            {error ? error.validationErrors.map(valErr => (
              valErr.param === field.name ? (
                <ValidationError key={valErr.param} msg={valErr.msg} />
              ) : null
            )) : null}
          </div>
        ))}
        <button type="submit">SUBMIT</button>
        {loading ? <p>Loading...</p> : null}
      </form>
    </div>
  );
};

export default UpsertFormContainer;
