import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Projects from './components/Pages/Projects/Projects';
import Project from './components/Pages/Projects/Project';
import Tickets from './components/Pages/Tickets/Tickets';
import Ticket from './components/Pages/Tickets/Ticket';
import ProjectUpsertForm from './components/Pages/UpsertForms/ProjectUpsertForm';
import TicketUpsertForm from './components/Pages/UpsertForms/TicketUpsertForm';

import './style/main.scss';

function App() {
  return (
    <>
      <Switch>
        <Route path="/projects/project/:editId/edit" exact={true} render={props => (
          <ProjectUpsertForm {...props} />
        )} />
        <Route path="/projects/project/:id" exact={true} render={props => (
          <Project {...props} />
        )} />
        <Route path="/projects/create" exact={true} render={props => (
          <ProjectUpsertForm {...props}/>
        )} />
        <Route path="/projects" render={() => (
          <Projects />
        )} />
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
      </Switch>
    </>
  );
};

export default App;
