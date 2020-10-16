import React, { useState, useEffect } from 'react';

import useAxios from '../../hooks/useAxios';
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';

const AssignUsers = ({ assignedUserIds, endpointToSendData, handleSuccess }) => {
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

  let assignUsersContent = <p>Loading...</p>;
  if (error && !data) {
    assignUsersContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    assignUsersContent = (
      <form onSubmit={handleSubmit}>
        {data.map(user => (
          <div key={user.id}>
            <label>
              <span>{user.name}</span>
              <span>{user.jobTitle}</span>
              <input
                type="checkbox"
                checked={assignedUsers.includes(user.id)}
                onChange={() => handleCheckedUser(user.id)} />
            </label>
          </div>
        ))}
        <button type="submit">Assign</button>
        {loading ? <p>loading...</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
    );
  }

  return (
    <div className="Assign-Users">
      {assignUsersContent}
    </div>
  );
};

export default AssignUsers;