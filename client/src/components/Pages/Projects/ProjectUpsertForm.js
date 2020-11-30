import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import Form from '../../Form/Form';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const ProjectUpsertForm = () => {
  const { editId } = useParams();

  let endpointToSendData, endpointToGetEditData;
  if (editId) {
    endpointToSendData = `projects/project/${editId}`;
    endpointToGetEditData = `projects/project/${editId}`
  } else {
    endpointToSendData = 'projects';
  }
  
  const formFields = [
    {
      title: 'title',
      key: 'title',
      element: 'input',
      type: 'text',
      initValue: ''
    },
    {
      title: 'description',
      key: 'description',
      element: 'input',
      type: 'text',
      initValue: ''
    }
  ];

  return (
    <div className="Pages Form-Page">
      <PageTitle>
        {editId ? 'edit project' : 'create project'}
      </PageTitle>
      <Form 
        formFields={formFields}
        endpointToSendData={endpointToSendData}
        onCompletionRedirect="/projects/project"
        endpointToGetEditData={endpointToGetEditData} />
    </div>
  );
};

export default withAuthLevelCheck(ProjectUpsertForm, 2);