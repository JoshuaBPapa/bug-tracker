import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import TicketCommentForm from '../../Forms/TicketCommentForm';

const TicketCommentFormPage = () => {
  const { ticketId } = useParams();

  return (
    <div>
      <PageTitle>
        add a comment
      </PageTitle>
      <FormContainer
        endpointToSendData={`tickets/ticket/${ticketId}/comments`}
        onCompletionRedirection="/tickets/ticket">
        <TicketCommentForm />
      </FormContainer>
    </div>
  );
};

export default TicketCommentFormPage;