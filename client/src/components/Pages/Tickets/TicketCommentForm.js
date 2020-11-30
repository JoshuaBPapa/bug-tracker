import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import Form from '../../Form/Form';

const TicketCommentForm = () => {
  const { ticketId } = useParams();

  const formFields = [
    {
      title: 'title',
      key: 'title',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'content',
      key: 'content',
      element: 'textArea',
      initValue: ''
    }
  ];

  return (
    <div className="Pages Form-Page">
      <PageTitle>
        add a comment
      </PageTitle>
      <Form
        formFields={formFields}
        endpointToSendData={`tickets/ticket/${ticketId}/comments`}
        onCompletionRedirect="/tickets/ticket" />
    </div>
  );
};

export default TicketCommentForm;