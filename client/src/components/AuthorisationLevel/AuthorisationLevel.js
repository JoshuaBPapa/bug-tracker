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
    return convertAuthLevelToString(value);
  }
};

export default AuthorisationLevel;