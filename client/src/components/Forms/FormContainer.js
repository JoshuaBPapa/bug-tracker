import React, { cloneElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FormError from './FormError';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

const FormContainer = ({ children, endpointToSendData, onCompletionRedirection, endpointToGetEditData }) => {
  const { loading, data, error, sendRequest, sentDataResponse } = useAxios();
  const history = useHistory();
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
    return <LoadingSpinner />
    // return the form if the data is finally fetched
    // OR if there is no endpointToGetEditData, there is no data to fetch
  } else if (data || !endpointToGetEditData) {
    return (
      <div className="Form-Container">
        {form}
        {loading ? <LoadingSpinner /> : null}
        {error ? <FormError error={error} /> : null}
      </div>
    );
  }
};

export default FormContainer;