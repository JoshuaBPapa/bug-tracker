import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import TicketCommentForm from '../../Forms/TicketCommentForm';

const TicketCommentFormPage = ({ match }) => {
  const { ticketId, } = match.params;

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