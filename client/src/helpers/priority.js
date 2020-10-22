export const convertPriorityToString = priority => {
  switch (priority) {
    case 1:
      return 'Severe';
    case 2:
      return 'High';
    case 3:
      return 'Moderate';
    case 4:
      return 'Low';
    default:
      return 'n/a';
  };
};