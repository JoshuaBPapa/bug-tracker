import React, { useState, useEffect } from 'react';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

const AssignUsersModal = ({ assignedUserIds, endpointToSendData, handleSuccess }) => {
  const [assignedUsers, setAssignedUsers] = useState([...assignedUserIds]);
  const { loading, data, error, sendRequest, sentDataResponse } = useAxios();

  useEffect(() => {
    sendRequest('GET', 'users_to_assign');

    if (sentDataResponse) {
      handleSuccess();
    }
  }, [sendRequest, sentDataResponse, handleSuccess]);

  const handleCheckedUser = userId => {
    const checkedUserIndex = assignedUsers.indexOf(userId);

    // user not checked, add to assignedUsers
    if (checkedUserIndex === -1) {
      setAssignedUsers(prevChecked => [...prevChecked, userId]);
      // user is checked, remove from assignedUsers
    } else {
      setAssignedUsers(prevChecked => {
        return prevChecked.filter(user => user !== userId);
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const dataToSend = { userIds: assignedUsers.join(',') };

    sendRequest('PUT', endpointToSendData, dataToSend);
  };

  let assignUsersContent = <LoadingSpinner />;
  if (error && !data) {
    assignUsersContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    assignUsersContent = (
      <form
        className="Assign-User-Modal"
        onSubmit={handleSubmit}>
        <div className="Assign-User-Modal-users-wrapper">
          {data.map(user => (
            <div
              key={user.id}>
              <label>
                <span className="Assigned-Users-name">
                  {user.name}
                </span>
                <span className="Assigned-Users-job-title">
                  {user.jobTitle}
                </span>
                <input
                  type="checkbox"
                  checked={assignedUsers.includes(user.id)}
                  onChange={() => handleCheckedUser(user.id)} />
              </label>
            </div>
          ))}
        </div>
        <button type="submit">Assign</button>
        {loading ? <LoadingSpinner /> : null}
        {error ? <p className="Assign-User-Modal-error">{error}</p> : null}
      </form>
    );
  }

  return (
    <div className="Assign-Users-Modal">
      {assignUsersContent}
    </div>
  );
};

export default AssignUsersModal;