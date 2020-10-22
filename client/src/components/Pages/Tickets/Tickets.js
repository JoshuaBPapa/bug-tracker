import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';
import TicketChartsWrapper from '../../Charts/TicketChartsWrapper';
import TicketsStatusBarChart from '../../Charts/TicketsStatusBarChart';
import TicketsPriorityPieChart from '../../Charts/TicketsPriorityPieChart';

const Tickets = () => (
  <div>
    <PageTitle>
      tickets
    </PageTitle>
    {/* tickets charts on the tickets page are not fetching tickets assigned to a project or user so an empty string is passed */}
    <TicketChartsWrapper>
      <TicketsStatusBarChart endpoint=""/>
      <TicketsPriorityPieChart endpoint=""/>
    </TicketChartsWrapper>
    {/* tickets table on the tickets page is not fetching tickets assigned to a project or user so an empty string is passed */}
    <TicketsTable ticketsAssignment="" />
  </div>
);

export default Tickets;