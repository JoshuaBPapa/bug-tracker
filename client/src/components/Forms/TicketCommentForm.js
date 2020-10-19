import React, { useState } from 'react';

import FormField from './FormField';

const TicketCommentForm = ({ submitted, validationErrors }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const formData = {
    title: title,
    content: content
  };

  return (
    <form onSubmit={e => submitted(e, formData)}>
      <FormField
        title="comment title"
        valErr={validationErrors && validationErrors.title}>
        <input
          value={title}
          onChange={e => { setTitle(e.target.value) }} />
      </FormField>
      <FormField
        title="comment content"
        valErr={validationErrors && validationErrors.content}>
        <textarea
          value={content}
          onChange={e => { setContent(e.target.value) }} />
      </FormField>
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default TicketCommentForm;