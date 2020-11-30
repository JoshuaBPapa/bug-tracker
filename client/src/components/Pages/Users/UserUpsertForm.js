import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';
import Form from '../../Form/Form';

const UserUpsertForm = () => {
  const { editId } = useParams();

  let endpointToSendData, endpointToGetEditData;
  if (editId) {
    endpointToSendData = `users/user/${editId}`;
    endpointToGetEditData = `users/user/${editId}`;
  } else {
    endpointToSendData = `users`;
  };

  const formFields = [
    {
      title: 'email',
      key: 'email',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'name',
      key: 'name',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'job title',
      key: 'jobTitle',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'authorisation level',
      key: 'authLevel',
      element: 'select',
      options: [
        1,
        2,
        3
      ],
      initValue: 1
    }
  ];

  // additional fields when creating a new user
  const newUserAdditionalFields = [
    {
      title: 'username',
      key: 'username',
      element: 'input',
      type: 'text',
      initValue: ''
    },
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

  // add additional fields if creating a new user
  if (!editId) {
    formFields.push(...newUserAdditionalFields);
  }

  return (
    <div className="Pages Form-Page">
      <PageTitle>
        {editId ? 'edit user' : 'create user'}
      </PageTitle>
      <Form
        formFields={formFields}
        endpointToGetEditData={endpointToGetEditData}
        endpointToSendData={endpointToSendData}
        onCompletionRedirect="/users/user" />
    </div>
  );
};

export default withAuthLevelCheck(UserUpsertForm, 3);