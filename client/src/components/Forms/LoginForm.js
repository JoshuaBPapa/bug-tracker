import React, { useState } from 'react';

import FormField from './FormField';

const LoginForm = ({ submitted, validationErrors }) => {
  const [teamName, setTeamName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const formData = {
    teamName: teamName,
    username: username,
    password: password
  };

  return (
    <form onSubmit={e => submitted(e, formData)}>
      <FormField 
        title="team name"
        valErr={validationErrors && validationErrors.teamName}>
        <input
          value={teamName}
          onChange={e => { setTeamName(e.target.value) }} />
      </FormField>
      <FormField 
        title="username"
        valErr={validationErrors && validationErrors.username}>
        <input
          value={username}
          onChange={e => { setUsername(e.target.value) }} />
      </FormField>
      <FormField 
        title="password"
        valErr={validationErrors && validationErrors.password}>
        <input
          value={password}
          type="password"
          onChange={e => { setPassword(e.target.value) }} />
      </FormField>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;  