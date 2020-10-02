import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import FormContainer from '../../Forms/FormContainer';
import ProjectUpsertForm from '../../Forms/ProjectUpsertForm';

const ProjectUpsertFormPage = ({ match }) => {
  const { editId } = match.params;

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

export default ProjectUpsertFormPage;