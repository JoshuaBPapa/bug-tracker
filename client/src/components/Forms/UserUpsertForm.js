import React, { useState, useEffect } from 'react';

import FormField from './FormField';
import AuthorisationLevel from '../AuthorisationLevel/AuthorisationLevel';

const UserUpsertForm = ({ submitted, editingData, validationErrors, isEditingUser }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [authLevel, setAuthLevel] = useState(1);

  useEffect(() => {
    if (editingData) {
      setName(editingData.name);
      setJobTitle(editingData.jobTitle);
      setAuthLevel(editingData.authLevel);
    }
  }, [editingData]);

  const formData = {
    name: name,
    jobTitle: jobTitle,
    authLevel: authLevel
  };

  // add the email, username, and password to formData if creating a user
  if (!isEditingUser) {
    formData.email = email;
    formData.username = username;
    formData.password = password;
    formData.confirmPassword = confirmPassword;
  }

  // the email, username, and password fields only render when creating a user
  const formFieldsforCreate = (
    <>
      <FormField
        title="email"
        valErr={validationErrors && validationErrors.email}>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </FormField>
      <FormField
        title="username"
        valErr={validationErrors && validationErrors.username}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)} />
      </FormField>
      <FormField
        title="password"
        valErr={validationErrors && validationErrors.password}>
        <input
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)} />
      </FormField>
      <FormField
        title="confirm password"
        valErr={validationErrors && validationErrors.confirmPassword}>
        <input
          value={confirmPassword}
          type="password"
          onChange={e => setConfirmPassword(e.target.value)} />
      </FormField>
    </>
  );

  return (
    <form onSubmit={e => submitted(e, formData)}>
      <>
        {/* ADD FORM FIELDS FOR CREATING A NEW USER IF NOT EDITING */}
        {isEditingUser ? null : formFieldsforCreate}
        <FormField
          title="name"
          valErr={validationErrors && validationErrors.name}>
          <input value={name} onChange={e => setName(e.target.value)} />
        </FormField>
        <FormField
          title="job title"
          valErr={validationErrors && validationErrors.jobTitle}>
          <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} />
        </FormField>
        <FormField title="authorisation level">
          <select value={authLevel} onChange={e => setAuthLevel(e.target.value)}>
            <AuthorisationLevel value={1} isOption={true} />
            <AuthorisationLevel value={2} isOption={true} />
            <AuthorisationLevel value={3} isOption={true} />
          </select>
        </FormField>
        <button type="submit">Submit</button>
      </>
    </form>
  );
};

export default UserUpsertForm;