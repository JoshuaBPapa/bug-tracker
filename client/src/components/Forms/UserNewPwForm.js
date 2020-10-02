import React, { useState } from 'react';

import FormField from './FormField';

const UserNewPwForm = ({ submitted, validationErrors }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const formData = {
    password: password,
    confirmPassword: confirmPassword
  };

  return (
    <form onSubmit={e => submitted(e, formData)}>
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
      <button type="submit">Change</button>
    </form>
  );
};

export default UserNewPwForm;