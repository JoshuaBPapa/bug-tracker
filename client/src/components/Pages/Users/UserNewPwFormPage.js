import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import UserUpdatePwForm from '../../Forms/UserNewPwForm';

const UserUpdatePwFormPage = ({ match }) => {
  const { editId } = match.params;

  return (
    <div>
      <PageTitle>
        change password
      </PageTitle>
      Note: The user will need to login again after changing their password
      <FormContainer
        endpointToSendData={`users/user/${editId}/new_password`}
        onCompletionRedirection="/users/user">
        <UserUpdatePwForm />
      </FormContainer>
    </div>
  );
};

export default UserUpdatePwFormPage;