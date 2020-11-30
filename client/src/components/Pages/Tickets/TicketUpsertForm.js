import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import Form from '../../Form/Form';

const TicketUpsertForm= () => {
  const { editId, assignedProjectId } = useParams();

  const formFields = [
    {
      title: 'title',
      key: 'title',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'description',
      key: 'description',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'status',
      key: 'status',
      element: 'select',
      options: [
        1,
        2,
        3,
        4
      ],
      initValue: 1
    },
    {
      title: 'priority',
      key: 'priority',
      element: 'select',
      options: [
        1,
        2,
        3,
        4
      ],
      initValue: 2
    }
  ];

  let endpointToSendData, endpointToGetEditData;
  if (editId) {
    endpointToSendData = `tickets/ticket/${editId}`;
    endpointToGetEditData = `tickets/ticket/${editId}`;
  } else {
    endpointToSendData = `tickets/${assignedProjectId}`;
  };

  return (
    <div className="Pages Form-Page">
      <PageTitle>
        {editId ? 'edit ticket' : 'create ticket'}
      </PageTitle>
      <Form 
        formFields={formFields}
        endpointToSendData={endpointToSendData}
        endpointToGetEditData={endpointToGetEditData}
        onCompletionRedirect="/tickets/ticket" />
    </div>
  );
};

export default TicketUpsertForm;