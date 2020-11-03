import React from 'react';

import { convertStatusToString } from '../../helpers/status';

const Status = ({ value, isOption }) => {
  if (isOption) {
    return (
      <option value={value}>
        {convertStatusToString(value)}
      </option>
    );
  } else {
    const className = convertStatusToString(value)
      .replace(' ', '-')
      .toLowerCase();

    return (
      <span className={`Status ${className}`}>
        {convertStatusToString(value)}
      </span>
    );
  }
};

export default Status;