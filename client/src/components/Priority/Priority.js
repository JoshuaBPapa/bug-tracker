import React from 'react';

import { convertPriorityToString } from '../../helpers/priority';

import priorityLow from '../../assets/icons/priorityLow.png';
import priorityModerate from '../../assets/icons/priorityModerate.png';
import priorityHigh from '../../assets/icons/priorityHigh.png';
import prioritySevere from '../../assets/icons/prioritySevere.png';

const Priority = ({ value, isOption }) => {
  let icon;
  switch (value) {
    case 1:
      icon = priorityLow;
      break;
    case 2:
      icon = priorityModerate;
      break;
    case 3:
      icon = priorityHigh;
      break;
    case 4:
      icon = prioritySevere;
      break;
    default:
      return;
  };

  if (isOption) {
    return (
      <option value={value}>
        {convertPriorityToString(value)}
      </option>
    );
  } else {
    const className = convertPriorityToString(value).toLowerCase();

    return (
      <span className={`Priority ${className}`}>
         <img src={icon} alt="priority" />{convertPriorityToString(value)}
      </span>
    );
  }
};

export default Priority;