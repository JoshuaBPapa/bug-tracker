import React from 'react';

const Priority = ({ value }) => {
  let priorityString;
  switch (value) {
    case 1:
      priorityString = 'severe';
    case 2:
      priorityString = 'high';
    case 3:
      priorityString = 'moderate';
    case 4:
      priorityString = 'low';
    default:
      priorityString = 'n/a';
  };
  
  return (
    <span>{priorityString}</span>
  );
};

export default Priority;