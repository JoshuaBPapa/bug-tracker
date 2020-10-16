import React, { useState, useEffect } from 'react';

import useAxios from '../../hooks/useAxios';

const DeleteItem = ({ deleteMessage, handleSuccess, deleteEndpoint }) => {
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
      sendRequest('DELETE', deleteEndpoint);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        {deleteMessage ? `Note: ${deleteMessage}` : null}
        <label>
          <input
            type="checkbox"
            checked={isConfirmedChecked}
            onChange={() => setIsConfirmedChecked(!isConfirmedChecked)} />
          <span>Confirm delete</span>
        </label>
        <button type="submit">Delete</button>
        {loading ? <p>loading...</p> : null}
        {error ? <p>{error}</p> : null}
        {isSubmitWithoutCheck ? (
          <p>Please tick the confirm delete checkbox.</p>
        ) : null}
      </form>
    </div>
  );
};

export default DeleteItem;