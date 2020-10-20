import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import TicketUpsertForm from '../../Forms/TicketUpsertForm';

const TicketUpsertFormPage = () => {
  const { editId, assignedProjectId } = useParams();

  let endpointToSendData, endpointToGetEditData;
  if (editId) {
    endpointToSendData = `tickets/ticket/${editId}`;
    endpointToGetEditData = `tickets/ticket/${editId}`;
  } else {
    endpointToSendData = `tickets/${assignedProjectId}`;
  };

  return (
    <div>
      <PageTitle>
        {editId ? 'edit ticket' : 'create ticket'}
      </PageTitle>
      <FormContainer
        endpointToSendData={endpointToSendData}
        onCompletionRedirection="/tickets/ticket"
        endpointToGetEditData={endpointToGetEditData}>
        <TicketUpsertForm />
      </FormContainer>
    </div>
  );
};

export default TicketUpsertFormPage;