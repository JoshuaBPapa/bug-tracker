import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../Modal/Modal';
import DeleteItem from './DeleteItem';

import { AuthContext } from '../../AuthContext';

const DeleteItemContainer = ({ itemType, id }) => {
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

  let deleteMessage;
  switch (itemType) {
    case 'ticket':
      deleteMessage = null;
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
    <div>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}>
        <DeleteItem
          deleteMessage={deleteMessage}
          handleSuccess={handleSuccess}
          deleteEndpoint={itemType === 'team' ?
            'teams/team' :
            `${itemType}s/${itemType}/${id}`} />
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>
        Delete {itemType}
      </button>
    </div>
  );
};

export default DeleteItemContainer;