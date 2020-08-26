import React from 'react';

const Status = ({ value, isOption }) => {
  let status;
  switch (value) {
    case 1:
      status = 'backlog';
      break
    case 2:
      status = 'in progress';
      break
    case 3:
      status = 'requires testing';
      break
    case 4:
      status = 'complete';
      break
    default:
      status = 'n/a';
  };

  if (isOption) {
    return (
      <option value={value}>
        {status}
      </option>
    );
  } else {
    return status;
  };
};

export default Status;