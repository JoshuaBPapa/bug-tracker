import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import UserUpsertForm from '../../Forms/UserUpsertForm';

const UserUpsertFormPage = ({ match }) => {
  const { editId } = match.params;

  let endpointToSendData, endpointToGetEditData;
  if (editId) {
    endpointToSendData = `users/user/${editId}`;
    endpointToGetEditData = `users/user/${editId}`;
  } else {
    endpointToSendData = `users`;
  };

  return (
    <div>
      <PageTitle>
       {editId ? 'edit user' : 'create user'}
      </PageTitle>
      <FormContainer 
        endpointToSendData={endpointToSendData}
        onCompletionRedirection="/users/user"
        endpointToGetEditData={endpointToGetEditData}>
        <UserUpsertForm isEditingUser={editId} />
      </FormContainer>
    </div>
  );
};

export default UserUpsertFormPage;