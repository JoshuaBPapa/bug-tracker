import React from 'react';

import { convertAuthLevelToString } from '../../helpers/authorisation-level';

const AuthorisationLevel = ({ value, isOption }) => {
  if (isOption) {
    return (
      <option value={value}>
        {convertAuthLevelToString(value)}
      </option>
    );
  } else {
    const className = convertAuthLevelToString(value)
      .replace(' ', '-')
      .toLowerCase();

    return (
      <span className={`Authorisation-Level ${className}`}>
        {convertAuthLevelToString(value)}
      </span>
    );
  }
};

export default AuthorisationLevel;