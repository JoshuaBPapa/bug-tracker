import React from 'react';

const Priority = ({ value, isOption }) => {
  let priority;
  switch (value) {
    case 1:
      priority = 'severe';
      break;
    case 2:
      priority = 'high';
      break;
    case 3:
      priority = 'moderate';
      break;
    case 4:
      priority = 'low';
      break;
    default:
      priority = 'n/a';
  };
  
  if (isOption) {
    return (
      <option value={value}>
        {priority}
      </option>
    );
  } else {
    return priority;
  };
};

export default Priority;