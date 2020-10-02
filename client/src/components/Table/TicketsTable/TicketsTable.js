import React from 'react';
import { useLocation } from 'react-router-dom';

import TableContainer from '../TableContainer';
import TicketsTableBody from './TicketsTableBody';

const TicketsTable = ({ ticketsAssignment }) => {
  const { pathname } = useLocation();
  const isTicketsOrUserPage =
    pathname === '/tickets' || pathname.includes('/users/user');

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
      text: 'users assigned',
      key: 'usersAssigned'
    },
    {
      text: 'created',
      key: 'created'
    }
  ];

  // add the project header to the tickets table on the tickets or user page
  if (isTicketsOrUserPage) {
    header.push({
      text: 'project',
      key: 'projectTitle'
    });
  }

  return (
    <TableContainer
      header={header}
      endpoint={`tickets${ticketsAssignment}`}
      initOrderBy="priority"
      initIsOrderAscending={false}>
      <TicketsTableBody 
        isTicketsOrUserPage={isTicketsOrUserPage} />
    </TableContainer>
  );
};

export default TicketsTable;