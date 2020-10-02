import React, { useState, useEffect } from 'react';

import FormField from './FormField';

const ProjectUpsertForm = ({ submitted, editingData, validationErrors }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingData) {
      setTitle(editingData.title);
      setDescription(editingData.description);
    }
  }, [editingData]);

  const formData = {
    title: title,
    description: description
  };

  return (
    <form onSubmit={e => submitted(e, formData)}>
      <FormField
        title="project title"
        valErr={validationErrors && validationErrors.title}>
        <input
          value={title}
          onChange={e => { setTitle(e.target.value) }} />
      </FormField>
      <FormField
        title="project description"
        valErr={validationErrors && validationErrors.description}>
        <input
          value={description}
          onChange={e => { setDescription(e.target.value) }} />
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProjectUpsertForm;