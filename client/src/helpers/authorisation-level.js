export const convertAuthLevelToString = authLevel => {
  switch (authLevel) {
    case 1:
      return 'User';
    case 2:
      return 'Project Manager';
    case 3:
      return 'Admin';
    case 4:
      return 'Master Admin';
    default:
      return 'n/a';
  };
};