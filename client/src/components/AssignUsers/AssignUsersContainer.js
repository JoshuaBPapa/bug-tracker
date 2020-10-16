import React, { useEffect, useState } from 'react';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import Modal from '../Modal/Modal';
import AssignUsers from './AssignUser';
import AssignedUsersList from './AssignedUsersList';

import useAxios from '../../hooks/useAxios';

const AssignUsersContainer = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, sendRequest } = useAxios();

  useEffect(() => {
    sendRequest('GET', `tickets/ticket/${id}/assigned_users`);
  }, [sendRequest, id]);

  // get the updated assigned users from the server after a successful submission
  const handleSuccessfulAssignment = () => {
    setIsModalOpen(false);
    sendRequest('GET', `tickets/ticket/${id}/assigned_users`);
  };

  let assignUsersContent = <p>loading...</p>;
  if (error) {
    assignUsersContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    assignUsersContent = (
      <div>
        <Modal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}>
          <AssignUsers
            handleSuccess={handleSuccessfulAssignment}
            assignedUserIds={data.map(user => user.id)}
            endpointToSendData={`tickets/ticket/${id}/assign_users`} />
        </Modal>
        <button onClick={() => setIsModalOpen(true)}>
          Add / Remove users
        </button>
        <AssignedUsersList assignedUsers={data} />
      </div>
    );
  }

  return assignUsersContent;
};

export default AssignUsersContainer;