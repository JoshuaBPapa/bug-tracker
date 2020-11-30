import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import Form from '../../Form/Form';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const UserNewPwForm = () => {
  const { editId } = useParams();

  const formFields = [
    {
      title: 'password',
      key: 'password',
      element: 'input',
      type: 'password',
      initValue: ''
    },
    {
      title: 'confirm password',
      key: 'confirmPassword',
      element: 'input',
      type: 'password',
      initValue: ''
    }
  ];

  return (
    <div className="Pages Form-Page User-New-Password">
      <PageTitle>
        change password
      </PageTitle>
      <div className="new-password-note">
        Note: The user will need to login again after changing their password
      </div>
      <Form
        formFields={formFields}
        endpointToSendData={`users/user/${editId}/new_password`}
        onCompletionRedirect="/users/user" />
    </div>
  );
};

export default withAuthLevelCheck(UserNewPwForm, 3);