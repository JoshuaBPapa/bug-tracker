import React from 'react';

import TableContainer from '../TableContainer';
import UsersTableBody from './UsersTableBody';

const UsersTable = () => {
  const header = [
    {
      text: 'id',
      key: 'id'
    },
    {
      text: 'username',
      key: 'username'
    },
    {
      text: 'name',
      key: 'name'
    },
    {
      text: 'job title',
      key: 'jobTitle'
    },
    {
      text: 'authority level',
      key: 'authLevel'
    },
    {
      text: 'tickets assigned',
      key: 'tickets'
    }
  ];
  
  return (
    <TableContainer
      header={header}
      endpoint="users"
      initOrderBy="id"
      initIsOrderAscending={true}>
      <UsersTableBody />
    </TableContainer>
  );
};

export default UsersTable;