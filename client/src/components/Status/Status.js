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
    return convertStatusToString(value);
  }
};

export default Status;