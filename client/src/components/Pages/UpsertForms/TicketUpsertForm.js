import React, { useEffect } from 'react';

import UpsertFormContainer from '../../UpsertForms/UpsertFormContainer';
import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';

import useAxios from '../../../hooks/useAxios';

const TicketUpsertForm = ({ match }) => {
  const { editId, assignedProjectId } = match.params;
  const { loading, data, error, getData } = useAxios();

  useEffect(() => {
    // if editing a ticket
    if (editId) {
      getData(`tickets/ticket/${editId}`);
    };
  }, [editId, getData]);

  let formFields = [
    {
      type: 'input',
      name: 'title',
      initValue: ''
    },
    {
      type: 'text area',
      name: 'description',
      initValue: ''
    },
    {
      type: 'select',
      name: 'status',
      initValue: 1,
      options: [
        1, // backlog
        2, // in progress
        3, // requires testing
        4 // complete
      ]
    },
    {
      type: 'select',
      name: 'priority',
      initValue: 3,
      options: [
        1, // severe
        2, // high
        3, // moderate
        4 // low
      ]
    }
  ];

  // if editing a project
  if (editId) {
    if (loading) {
      return <p>loading...</p>;
    } else if (error) {
      return (
        <FeedbackMessage>
          {error}
        </FeedbackMessage>
      );
    } else if (data) {
      formFields[0].initValue = data.title;
      formFields[1].initValue = data.description;
      formFields[2].initValue = data.status;
      formFields[3].initValue = data.priority;
    };
  };

  return (
    <UpsertFormContainer
      formFields={formFields}
      dbTable="ticket" 
      editId={editId}
      assignedProjectId={assignedProjectId} />
  );
};

export default TicketUpsertForm;