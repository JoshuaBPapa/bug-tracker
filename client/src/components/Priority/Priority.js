import React from 'react';

const Priority = ({ value }) => {
  let priorityString;
  console.log(value)
  switch (value) {
    case 1:
      priorityString = 'severe';
      break;
    case 2:
      priorityString = 'high';
      break;
    case 3:
      priorityString = 'moderate';
      break;
    case 4:
      priorityString = 'low';
      break;
    default:
      priorityString = 'n/a';
  };
  
  return (
    <span>{priorityString}</span>
  );
};

export default Priority;