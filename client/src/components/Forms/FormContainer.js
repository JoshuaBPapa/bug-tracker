import React, { cloneElement, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import FormError from './FormError';

import useAxios from '../../hooks/useAxios';

import { AuthContext } from '../../AuthContext';

const FormContainer = ({ children, endpointToSendData, onCompletionRedirection, endpointToGetEditData }) => {
  const { loading, data, error, sendRequest, sentDataResponse } = useAxios();
  const history = useHistory();
  const authContext = useContext(AuthContext); 
  const validationErrors = error && error.validationErrors;

  const handleSubmit = (e, formData) => {
    e.preventDefault();

    let method = 'POST';
    if (endpointToGetEditData) {
      method = 'PUT'
    }

    sendRequest(method, endpointToSendData, formData);
  };

  useEffect(() => {
    // if editing an existing item, get data to pre-fill fields
    if (endpointToGetEditData) {
      sendRequest('GET', endpointToGetEditData);
    }

    // redirect the user to the item's page on a successful response from the PUT/POST request
    if (sentDataResponse) {
      history.push(`${onCompletionRedirection}/${sentDataResponse.id}`);
    }
  }, [
    endpointToGetEditData,
    sendRequest,
    sentDataResponse,
    history,
    onCompletionRedirection,
    endpointToSendData,
    authContext
  ]);

  // pass props to the child form
  const form = cloneElement(
    children,
    {
      submitted: handleSubmit,
      editingData: data,
      validationErrors: validationErrors
    }
  );
  
  // if editing an existing item, return loading until the data is fetched
  if (!data && endpointToGetEditData) {
    return <p>Loading...</p>
    // return the form if the data is finally fetched
    // OR if there is no endpointToGetEditData, there is no data to fetch
  } else if (data || !endpointToGetEditData) {
    return (
      <div className="Form-Container">
        {form}
        {loading ? <p>Loading...</p> : null}
        {error ? <FormError error={error} /> : null}
      </div>
    );
  }
};

export default FormContainer;