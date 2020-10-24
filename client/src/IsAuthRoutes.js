import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// project pages
const Projects = lazy(() => import('./components/Pages/Projects/Projects'));
const ProjectUpsertFormPage = lazy(() => import('./components/Pages/Projects/ProjectUpsertFormPage'));
const Project = lazy(() => import('./components/Pages/Projects/Project'));
// ticket pages
const Ticket = lazy(() => import('./components/Pages/Tickets/Ticket'));
const TicketUpsertFormPage = lazy(() => import('./components/Pages/Tickets/TicketUpsertFormPage'));
const TicketCommentFormPage = lazy(() => import('./components/Pages/Tickets/TicketCommentFormPage'));
const Tickets = lazy(() => import('./components/Pages/Tickets/Tickets'));
// user pages
const Users = lazy(() => import('./components/Pages/Users/Users'));
const UserNewPwFormPage = lazy(() => import('./components/Pages/Users/UserNewPwFormPage'));
const UserUpsertFormPage = lazy(() => import('./components/Pages/Users/UserUpsertFormPage'));
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
        render={() => <ProjectUpsertFormPage />} />
      {/* project page */}
      <Route
        path="/projects/project/:id"
        exact={true}
        render={() => <Project />} />
      {/* create a project page */}
      <Route
        path="/projects/create"
        exact={true}
        render={() => <ProjectUpsertFormPage />} />

      {/* TICKET ROUTES */}
      {/* tickets page */}
      <Route path="/tickets" exact={true} render={() => <Tickets />} />
      {/* add a comment to a ticket page */}
      <Route
        path="/tickets/ticket/:ticketId/comment"
        exact={true}
        render={() => <TicketCommentFormPage />} />
      {/* edit a ticket page */}
      <Route
        path="/tickets/ticket/:editId/edit"
        exact={true}
        render={() => <TicketUpsertFormPage />} />
      {/* create a ticket page */}
      <Route
        path="/tickets/create/:assignedProjectId"
        exact={true}
        render={() => <TicketUpsertFormPage />} />
      {/* ticket page */}
      <Route
        path="/tickets/ticket/:id"
        exact={true}
        render={() => <Ticket />} />

      {/* USER ROUTES */}
      {/* users page */}
      <Route path="/users" exact={true} render={() => <Users />} />
      {/* set a new password for a user page */}
      <Route
        path="/users/user/:editId/new_password"
        exact={true}
        render={() => <UserNewPwFormPage />} />
      {/* edit a user page */}
      <Route
        path="/users/user/:editId/edit"
        exact={true}
        render={() => <UserUpsertFormPage />} />
      {/* create a user page */}
      <Route
        path="/users/create"
        exact={true}
        render={() => <UserUpsertFormPage />} />
      {/* user page */}
      <Route
        path="/users/user/:id"
        exact={true}
        render={() => <User />} />

      {/* TEAM ROUTES */}
      {/* team page */}
      <Route path="/team" exact={true} render={() => <Team />} />

      {/* REDIRECT INVALID PATHS TO THE USER'S page */}
      <Redirect to={`/users/user/${userId}`} />
    </Switch>
  );
};

export default IsAuthRoutes;