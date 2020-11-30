import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import ChartsWrapper from '../../Charts/ChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';
import Table from '../../Table/Table';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Tickets = () => {
  const tableHeader = [
    {
      text: 'id',
      key: 'id'
    },
    {
      text: 'title',
      key: 'title'
    },
    {
      text: 'priority',
      key: 'priority'
    },
    {
      text: 'status',
      key: 'status'
    },
    {
      text: 'created',
      key: 'created'
    },
    {
      text: 'project',
      key: 'projectId'
    },
    {
      text: 'users assigned',
      key: 'usersAssigned'
    },
  ];

  return (
    <div>
      <PageTitle>
        tickets
      </PageTitle>
      {/* ticket charts on the tickets page are not fetching tickets assigned to a project or user so an empty endpoint is passed */}
      <ChartsWrapper>
        <TicketsStatusBarChart endpoint="" />
        <TicketsPriorityPieChart endpoint="" />
      </ChartsWrapper>
      <Table
        initOrderBy="priority"
        initIsOrderAscending={false}
        endpoint="tickets"
        header={tableHeader} 
        itemType="ticket" />
    </div>
  );
};

export default withAuthLevelCheck(Tickets, 2);