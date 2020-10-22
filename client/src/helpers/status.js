export const convertStatusToString = status => {
  switch (status) {
    case 1:
      return 'Backlog';
    case 2:
      return 'In progress';
    case 3:
      return 'Requires testing';
    case 4:
      return 'Complete';
    default:
      return 'n/a';
  };
};