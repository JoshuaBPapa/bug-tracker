import React, { useState, useEffect } from 'react';

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

import useAxios from '../../../hooks/useAxios';

const DeleteItem = ({ deleteMessage, handleSuccess, endpointToSendDelete }) => {
  const [isConfirmedChecked, setIsConfirmedChecked] = useState(false);
  const [isSubmitWithoutCheck, setIsSubmitWithoutCheck] = useState(false);
  const { loading, error, sendRequest, sentDataResponse } = useAxios();

  useEffect(() => {
    if (sentDataResponse) {
      handleSuccess();
    }
  }, [sentDataResponse, handleSuccess]);

  const submitHandler = e => {
    e.preventDefault();

    // check the user has checked the confirmation checkbox
    if (!isConfirmedChecked) {
      setIsSubmitWithoutCheck(true);
    } else {
      setIsSubmitWithoutCheck(false);
      sendRequest('DELETE', endpointToSendDelete);
    }
  };

  return (
    <div className="Delete-Item-Modal">
      <form onSubmit={submitHandler}>
        {deleteMessage ? <p>Note: {deleteMessage}</p> : null}
        <label>
          Confirm Delete
          <input
            type="checkbox"
            checked={isConfirmedChecked}
            onChange={() => setIsConfirmedChecked(!isConfirmedChecked)} />
        </label>
        {isSubmitWithoutCheck ? (
          <span className="Delete-Item-Modal-error">
            Please tick the confirm delete checkbox.
          </span>
        ) : null}
        <button type="submit">Delete</button>
        {loading ? <LoadingSpinner /> : null}
        {error ? (
          <span className="Delete-Item-Modal-Error">
            {error}
          </span>
        ) : null}
      </form>
    </div>
  );
};

export default DeleteItem;