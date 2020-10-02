import React from 'react';

const AuthorisationLevel = ({ value, isOption }) => {
  let authorisationLevel;
  switch (value) {
    case 1:
      authorisationLevel = 'user';
      break;
    case 2:
      authorisationLevel = 'project manager';
      break;
    case 3:
      authorisationLevel = 'admin';
      break;
    case 4:
      authorisationLevel = 'master admin';
      break;
    default:
      authorisationLevel = 'n/a';
      break;
  };

  if (isOption) {
    return (
      <option value={value}>
        {authorisationLevel}
      </option>
    );
  } else {
    return authorisationLevel;
  }
};

export default AuthorisationLevel;