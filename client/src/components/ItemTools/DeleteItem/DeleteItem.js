import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../../Modal/Modal';
import DeleteItemModal from './DeleteItemModal';

import { AuthContext } from '../../../AuthContext';

import deleteIcon from '../../../assets/icons/deleteIcon.png';

const DeleteItem = ({ itemType, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const handleSuccess = () => {
    // remove auth and send the user back to the login screen if they delete their team
    if (itemType === 'team') {
      authContext.removeAuth();
    } else {
      history.push(`/${itemType}s`);
    }
  };

  let endpointToSendDelete = `${itemType}s/${itemType}/${id}`;
  if (itemType === 'team') {
    endpointToSendDelete = 'teams/team';
  }

  let deleteMessage;
  switch (itemType) {
    case 'ticket':
      deleteMessage = 'This will delete the ticket with all its comments.';
      break;
    case 'project':
      deleteMessage = 'If you delete a project, all tickets assigned to this project will be deleted as well.';
      break;
    case 'user':
      deleteMessage = 'All tickets created by a user will remain after the user is deleted.';
      break;
    case 'team':
      deleteMessage = "Deleting a team will delete the entire team's account. All projects, tickets, and users will be removed.";
      break;
    default:
      break;
  }

  return (
    <div className="Delete-Item">
      <Modal
        title="Delete"
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}>
        <DeleteItemModal
          deleteMessage={deleteMessage}
          handleSuccess={handleSuccess}
          endpointToSendDelete={endpointToSendDelete} />
      </Modal>
      <button
        onClick={() => setIsModalOpen(true)}
        className="item-tool">
        <img src={deleteIcon} alt="delete" />
        Delete {itemType}
      </button>
    </div>
  );
};

export default DeleteItem;