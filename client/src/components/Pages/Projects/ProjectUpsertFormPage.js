import React from 'react';
import { useParams } from 'react-router-dom';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import ProjectUpsertForm from '../../Forms/ProjectUpsertForm';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const ProjectUpsertFormPage = () => {
  const { editId } = useParams();

  let endpointToSendData, endpointToGetEditData;
  if (editId) {
    endpointToSendData = `projects/project/${editId}`;
    endpointToGetEditData = `projects/project/${editId}`
  } else {
    endpointToSendData = 'projects';
  }

  return (
    <div>
      <PageTitle>
        {editId ? 'edit project' : 'create project'}
      </PageTitle>
      <FormContainer
        endpointToSendData={endpointToSendData}
        onCompletionRedirection="/projects/project"
        endpointToGetEditData={endpointToGetEditData}>
        <ProjectUpsertForm />
      </FormContainer>
    </div>
  );
};

export default withAuthLevelCheck(ProjectUpsertFormPage, 2);