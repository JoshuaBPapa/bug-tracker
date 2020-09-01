import React from 'react';
import { Route } from 'react-router-dom';

import Tickets from '../components/Pages/Tickets/Tickets';
import Ticket from '../components/Pages/Tickets/Ticket';
import TicketUpsertForm from '../components/Pages/UpsertForms/TicketUpsertForm';

const TicketRoutes = () => (
  <>
    <Route path="/tickets/ticket/:editId/edit" exact={true} render={props => (
      <TicketUpsertForm {...props} />
    )} />
    <Route path="/tickets/create/:assignedProjectId" exact={true} render={props => (
      <TicketUpsertForm {...props} />
    )} />
    <Route path="/tickets/ticket/:id" exact={true} render={props => (
      <Ticket {...props} />
    )} />
    <Route path="/tickets" render={() => <Tickets />} />
  </>
);

export default TicketRoutes;