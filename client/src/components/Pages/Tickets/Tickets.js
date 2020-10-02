import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';

const Tickets = () => (
  <div>
    <PageTitle>
      tickets
    </PageTitle>
    <TicketsTable ticketsAssignment={''} />
  </div>
);

export default Tickets;