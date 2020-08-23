import React from 'react';

import PageTitle from '../../PageTitle/PageTitle';
import TableContainer from '../../DataTable/TableContainer';

const Tickets = () => (
  <div>
    <PageTitle>
      tickets
    </PageTitle>
    <TableContainer
      contentUrl="/tickets/ticket" 
      endpoint="tickets"
      initOrderBy="created" 
      initIsOrderAscending={false} />
  </div>
);

export default Tickets;