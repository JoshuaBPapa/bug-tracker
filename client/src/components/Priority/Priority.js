import React from 'react';

import { convertPriorityToString } from '../../helpers/priority';

const Priority = ({ value, isOption }) => {  
  if (isOption) {
    return (
      <option value={value}>
        {convertPriorityToString(value)}
      </option>
    );
  } else {
    return convertPriorityToString(value);
  };
};

export default Priority;