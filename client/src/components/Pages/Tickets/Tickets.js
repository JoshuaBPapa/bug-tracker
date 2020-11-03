import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import ChartsWrapper from '../../Charts/ChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';

import withAuthLevelCheck from '../../../hoc/withAuthLevelCheck';

const Tickets = () => (
  <div>
    <PageTitle>
      tickets
    </PageTitle>
    {/* ticket charts on the tickets page are not fetching tickets assigned to a project or user so an empty string is passed */}
    <ChartsWrapper>
      <TicketsStatusBarChart endpoint=""/>
      <TicketsPriorityPieChart endpoint=""/>
    </ChartsWrapper>
    {/* tickets table on the tickets page is not fetching tickets assigned to a project or user so an empty string is passed */}
    <TicketsTable ticketsAssignment="" />
  </div>
);

export default withAuthLevelCheck(Tickets, 2);