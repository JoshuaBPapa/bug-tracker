import React, { useState } from 'react';

import FormField from './FormField';

const SignUp = ({ submitted, validationErrors }) => {
  const [teamName, setTeamName] = useState('');
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formData = {
    teamName: teamName,
    name: name,
    jobTitle: jobTitle,
    email: email,
    username: username,
    password: password,
    confirmPassword: confirmPassword
  };

  return (
    <form onSubmit={e => { submitted(e, formData) }}>
      <FormField
        title="team name"
        valErr={validationErrors && validationErrors.teamName}>
        <input
          value={teamName}
          onChange={e => setTeamName(e.target.value)} />
      </FormField>
      <FormField
        title="your name"
        valErr={validationErrors && validationErrors.name}>
        <input
          value={name}
          onChange={e => setName(e.target.value)} />
      </FormField>
      <FormField
        title="your job title"
        valErr={validationErrors && validationErrors.jobTitle}>
        <input
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)} />
      </FormField>
      <FormField
        title="your email"
        valErr={validationErrors && validationErrors.email}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)} />
      </FormField>
      <FormField
        title="your username"
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;