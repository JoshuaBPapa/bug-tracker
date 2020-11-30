import React, { useEffect, useState } from 'react';

import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import Modal from '../Modal/Modal';
import AssignUsersModal from './AssignUserModal';
import AssignedUsersList from './AssignedUsersList';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import useAxios from '../../hooks/useAxios';

const AssignUsers = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, sendRequest } = useAxios();
  const userAuthLevel = localStorage.getItem('authorisation-level');

  useEffect(() => {
    sendRequest('GET', `tickets/ticket/${id}/assigned_users`);
  }, [sendRequest, id]);

  // get the updated assigned users from the server after a successful submission
  const handleSuccessfulAssignment = () => {
    setIsModalOpen(false);
    sendRequest('GET', `tickets/ticket/${id}/assigned_users`);
  };

  let assignUsersContent = <LoadingSpinner />;
  if (error) {
    assignUsersContent = (
      <FeedbackMessage>
        {error}
      </FeedbackMessage>
    );
  } else if (data) {
    assignUsersContent = (
      <div className="Assign-Users">
        {/* only users with auth level above 1 can assign / remove users from a ticket */}
        {userAuthLevel > 1 ? (
          <>
            <Modal
              title="Assign / Remove Users"
              isModalOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}>
              <AssignUsersModal
                handleSuccess={handleSuccessfulAssignment}
                assignedUserIds={data.map(user => user.id)}
                endpointToSendData={`tickets/ticket/${id}/assign_users`} />
            </Modal>
            <button
              className="open-assign-users-modal-button"
              onClick={() => setIsModalOpen(true)}>
              Assign / Remove users
            </button>
          </>
        ) : null}
        {data.length ? (
          <AssignedUsersList assignedUsers={data} />
        ) : null}
      </div>
    );
  }

  return assignUsersContent;
};

export default AssignUsers;