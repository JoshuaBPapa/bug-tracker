import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FormField from './FormField';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import FormError from './FormError';

import useAxios from '../../hooks/useAxios';

const Form = ({ formFields, endpointToSendData, endpointToGetEditData, onCompletionRedirect }) => {
  const initState = formFields.reduce((accumlator, field) => {
    return { ...accumlator, [field.key]: field.initValue }
  }, {});
  const [formData, setFormData] = useState(initState);
  const history = useHistory();
  const { loading, data, error, sendRequest, sentDataResponse } = useAxios();
  const validationErrors = error && error.validationErrors;

  useEffect(() => {
    // if editing an existing item, get data to pre-fill fields
    if (endpointToGetEditData && !data) {
      sendRequest('GET', endpointToGetEditData);
    }

    // pre-fill fields
    if (data) {
      setFormData(prevState => {
        const newState = { ...prevState };

        for (const property in data) {
          newState[property] = data[property];
        };

        return newState;
      });
    }

    // redirect the user to the item's page on a successful response from the request
    if (sentDataResponse && onCompletionRedirect) {
      history.push(`${onCompletionRedirect}/${sentDataResponse.id}`);
    }
  }, [
    data,
    endpointToSendData,
    endpointToGetEditData,
    sendRequest,
    history,
    onCompletionRedirect,
    sentDataResponse
  ]);

  const handleSubmit = e => {
    e.preventDefault();

    let method = 'POST';
    if (endpointToGetEditData) {
      method = 'PUT'
    }

    sendRequest(method, endpointToSendData, formData);
  };

  const handleInputChange = (newValue, field) => {
    setFormData(prevState => {
      const newState = { ...prevState };
      newState[field] = newValue;

      return newState;
    });
  };

  if (!data && endpointToGetEditData) {
    // if editing an existing item, return loading until the data is fetched
    return <LoadingSpinner />;
  } else if (data || !endpointToGetEditData) {
    // return the form if the data is finally fetched or if there is no data to fetch
    return (
      <div className="Form">
        <form onSubmit={handleSubmit}>
          {formFields.map(field => (
            <FormField
              key={field.key}
              field={field}
              value={formData[field.key]}
              changed={handleInputChange}
              validationError={validationErrors && validationErrors[field.key]} />
          ))}
          <button type="submit">Submit</button>
        </form>
        {loading ? <LoadingSpinner /> : null}
        {error ? <FormError error={error} /> : null}
      </div>
    );
  }
};

export default Form;