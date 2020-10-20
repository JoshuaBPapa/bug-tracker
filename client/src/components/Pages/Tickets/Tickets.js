import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TicketsTable from '../../Table/TicketsTable/TicketsTable';

const Tickets = () => (
  <div>
    <PageTitle>
      tickets
    </PageTitle>
    {/* tickets table on the tickets page is not fetching tickets assigned to a project or user so an empty string is passed */}
    <TicketsTable ticketsAssignment={''} />
  </div>
);

export default Tickets;