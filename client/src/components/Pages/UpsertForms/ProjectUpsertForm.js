import React, { useEffect } from 'react';

import UpsertFormContainer from '../../UpsertForms/UpsertFormContainer';
import FeedbackMessage from '../../FeedbackMessage/FeedbackMessage';

import useAxios from '../../../hooks/useAxios';

const ProjectUpsertForm = ({ match }) => {
  const { editId } = match.params;
  const { loading, data, error, getData } = useAxios();

  useEffect(() => {
    // if editing a project
    if (editId) {
      getData(`projects/project/${editId}`);
    };
  }, [editId, getData]);

  let formFields = [
    {
      type: 'input',
      name: 'title',
      initValue: ''
    },
    {
      type: 'text area',
      name: 'description',
      initValue: ''
    }
  ];

  // if editing a project
  if (editId) {
    if (loading) {
      return <p>loading...</p>;
    } else if (error) {
      return (
        <FeedbackMessage>
          {error}
        </FeedbackMessage>
      );
    } else if (data) {
      formFields[0].initValue = data.title;
      formFields[1].initValue = data.description;
    };
  };

  return (
    <UpsertFormContainer
      formFields={formFields}
      dbTable="project" 
      editId={editId} />
  );
};

export default ProjectUpsertForm;