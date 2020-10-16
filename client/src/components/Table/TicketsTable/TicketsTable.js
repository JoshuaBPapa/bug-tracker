import React from 'react';
import { useLocation } from 'react-router-dom';

import TableContainer from '../TableContainer';
import TicketsTableBody from './TicketsTableBody';

const TicketsTable = ({ ticketsAssignment }) => {
  const { pathname } = useLocation();
  const isProjectPage = pathname.includes('/projects/project');
  const isUserPage = pathname.includes('/users/user');

  const header = [
    {
      text: 'priority',
      key: 'priority'
    },
    {
      text: 'id',
      key: 'id'
    },
    {
      text: 'title',
      key: 'title'
    },
    {
      text: 'status',
      key: 'status'
    },
    {
      text: 'created',
      key: 'created'
    }
  ];

  // add the project header to the tickets table if not on a project's page
  if (!isProjectPage) {
    header.push({
      text: 'project',
      key: 'projectTitle'
    });
  }

  // add the users assigned header to the tickets table if not on a users's page
  if (!isUserPage) {
    header.splice(
      4,
      0,
      {
        text: 'users assigned',
        key: 'usersAssigned'
      }
    );
  }

  return (
    <TableContainer
      header={header}
      endpoint={`tickets${ticketsAssignment}`}
      initOrderBy="priority"
      initIsOrderAscending={false}>
      <TicketsTableBody
        isProjectPage={isProjectPage} 
        isUserPage={isUserPage} />
    </TableContainer>
  );
};

export default TicketsTable;