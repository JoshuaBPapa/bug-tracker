import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// project pages
const Projects = lazy(() => import('./components/Pages/Projects/Projects'));
const ProjectUpsertForm = lazy(() => import('./components/Pages/Projects/ProjectUpsertForm'));
const Project = lazy(() => import('./components/Pages/Projects/Project'));
// ticket pages
const Ticket = lazy(() => import('./components/Pages/Tickets/Ticket'));
const TicketUpsertForm = lazy(() => import('./components/Pages/Tickets/TicketUpsertForm'));
const TicketCommentForm = lazy(() => import('./components/Pages/Tickets/TicketCommentForm'));
const Tickets = lazy(() => import('./components/Pages/Tickets/Tickets'));
// user pages
const Users = lazy(() => import('./components/Pages/Users/Users'));
const UserNewPwForm = lazy(() => import('./components/Pages/Users/UserNewPwForm'));
const UserUpsertForm = lazy(() => import('./components/Pages/Users/UserUpsertForm'));
const User = lazy(() => import('./components/Pages/Users/User'));
const Team = lazy(() => import('./components/Pages/Team/Team'));

const IsAuthRoutes = () => {
  const userId = localStorage.getItem('userId'); 

  return (
    <Switch>
      {/* PROJECT ROUTES */}
      {/* projects page */}
      <Route path="/projects" exact={true} render={() => <Projects />} />
      {/* edit a project page */}
      <Route
        path="/projects/project/:editId/edit"
        exact={true}
        render={props => <ProjectUpsertForm key={props.location.pathname} />} />
      {/* project page */}
      <Route
        path="/projects/project/:id"
        exact={true}
        render={props => <Project key={props.location.pathname} />} />
      {/* create a project page */}
      <Route
        path="/projects/create"
        exact={true}
        render={() => <ProjectUpsertForm />} />

      {/* TICKET ROUTES */}
      {/* tickets page */}
      <Route path="/tickets" exact={true} render={() => <Tickets />} />
      {/* add a comment to a ticket page */}
      <Route
        path="/tickets/ticket/:ticketId/comment"
        exact={true}
        render={props => <TicketCommentForm key={props.location.pathname} />} />
      {/* edit a ticket page */}
      <Route
        path="/tickets/ticket/:editId/edit"
        exact={true}
        render={props => <TicketUpsertForm key={props.location.pathname} />} />
      {/* create a ticket page */}
      <Route
        path="/tickets/create/:assignedProjectId"
        exact={true}
        render={props => <TicketUpsertForm key={props.location.pathname} />} />
      {/* ticket page */}
      <Route
        path="/tickets/ticket/:id"
        exact={true}
        render={props => <Ticket key={props.location.pathname} />} />

      {/* USER ROUTES */}
      {/* users page */}
      <Route path="/users" exact={true} render={() => <Users />} />
      {/* set a new password for a user page */}
      <Route
        path="/users/user/:editId/new_password"
        exact={true}
        render={props => <UserNewPwForm key={props.location.pathname} />} />
      {/* edit a user page */}
      <Route
        path="/users/user/:editId/edit"
        exact={true}
        render={props => <UserUpsertForm key={props.location.pathname} />} />
      {/* create a user page */}
      <Route
        path="/users/create"
        exact={true}
        render={() => <UserUpsertForm />} />
      {/* user page */}
      <Route
        path="/users/user/:id"
        exact={true}
        render={props => <User key={props.location.pathname} />} />

      {/* TEAM ROUTES */}
      {/* team page */}
      <Route path="/team" exact={true} render={() => <Team />} />

      {/* REDIRECT INVALID PATHS TO THE USER'S page */}
      <Redirect to={`/users/user/${userId}`} />
    </Switch>
  );
};

export default IsAuthRoutes;