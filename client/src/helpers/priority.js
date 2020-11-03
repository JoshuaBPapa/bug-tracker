export const convertPriorityToString = priority => {
  switch (priority) {
    case 1:
      return 'Low';
    case 2:
      return 'Moderate';
    case 3:
      return 'High';
    case 4:
      return 'Severe';
    default:
      return 'n/a';
  };
};