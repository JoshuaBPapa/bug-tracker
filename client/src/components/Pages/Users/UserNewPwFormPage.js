import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import UserUpdatePwForm from '../../Forms/UserNewPwForm';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const UserNewPwFormPage = () => {
  const { editId } = useParams();

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

export default withAuthLevelCheck(UserNewPwFormPage, 3);