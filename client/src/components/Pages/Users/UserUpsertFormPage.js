import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import UserUpsertForm from '../../Forms/UserUpsertForm';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const UserUpsertFormPage = () => {
  const { editId } = useParams();

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

export default withAuthLevelCheck(UserUpsertFormPage, 3);