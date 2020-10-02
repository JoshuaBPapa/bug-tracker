import React, { useState, useEffect } from 'react';

import FormField from './FormField';
import Priority from '../Priority/Priority';
import Status from '../Status/Status';

const TicketUpsertForm = ({ submitted, editingData, validationErrors }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(1);
  const [priority, setPriority] = useState(3);

  useEffect(() => {
    if (editingData) {
      setTitle(editingData.title);
      setDescription(editingData.description);
      setStatus(editingData.status);
      setPriority(editingData.priority);
    };
  }, [editingData]);

  const formData = {
    title: title,
    description: description,
    status: status,
    priority: priority
  };

  return (
    <form onSubmit={e => submitted(e, formData)}>
      <FormField
        title="ticket title"
        valErr={validationErrors && validationErrors.title}>
        <input
          value={title}
          onChange={e => { setTitle(e.target.value) }} />
      </FormField>
      <FormField
        title="ticket description"
        valErr={validationErrors && validationErrors.description}>
        <input
          value={description}
          onChange={e => { setDescription(e.target.value) }} />
      </FormField>
      <FormField title="ticket status">
        <select value={status} onChange={e => { setStatus(e.target.value) }}>
          <Status value={1} isOption={true} />
          <Status value={2} isOption={true} />
          <Status value={3} isOption={true} />
          <Status value={4} isOption={true} />
        </select>
      </FormField>
      <FormField title="ticket priority">
        <select value={priority} onChange={e => { setPriority(e.target.value) }}>
          <Priority value={4} isOption={true} />
          <Priority value={3} isOption={true} />
          <Priority value={2} isOption={true} />
          <Priority value={1} isOption={true} />
        </select>
      </FormField>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TicketUpsertForm;