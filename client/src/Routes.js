import React from 'react';
import { Switch, Route } from 'react-router-dom';

// auth pages
import LoginSignUp from './components/Pages/Auth/LoginSignUp';
// project pages
import Projects from './components/Pages/Projects/Projects';
import ProjectUpsertFormPage from './components/Pages/Projects/ProjectUpsertFormPage';
import Project from './components/Pages/Projects/Project';
// ticket pages
import Ticket from './components/Pages/Tickets/Ticket';
import TicketUpsertFormPage from './components/Pages/Tickets/TicketUpsertFormPage';
import Tickets from './components/Pages/Tickets/Tickets';
// user pages
import Users from './components/Pages/Users/Users';
import UserNewPwFormPage from './components/Pages/Users/UserNewPwFormPage';
import UserUpsertFormPage from './components/Pages/Users/UserUpsertFormPage';
import User from './components/Pages/Users/User';

const Routes = () => (
  <Switch>
    {/* AUTH ROUTES */}
    <Route path="/login" exact={true} render={() => (
      <LoginSignUp />
    )} />

    {/* PROJECT ROUTES */}
    <Route path="/projects" exact={true} render={() => <Projects />} />
    <Route
      path="/projects/project/:editId/edit"
      exact={true}
      render={props => (
        <ProjectUpsertFormPage {...props} />
      )} />
    <Route
      path="/projects/project/:id"
      exact={true}
      render={props => (
        <Project {...props} />
      )} />
    <Route
      path="/projects/create"
      exact={true}
      render={props => (
        <ProjectUpsertFormPage {...props} />
      )} />

    {/* TICKET ROUTES */}
    <Route path="/tickets" exact={true} render={() => <Tickets />} />
    <Route
      path="/tickets/ticket/:editId/edit"
      exact={true}
      render={props => (
        <TicketUpsertFormPage {...props} />
      )} />
    <Route
      path="/tickets/create/:assignedProjectId"
      exact={true}
      render={props => (
        <TicketUpsertFormPage {...props} />
      )} />
    <Route
      path="/tickets/ticket/:id"
      exact={true}
      render={props => (
        <Ticket {...props} />
      )} />

    {/* USER ROUTES */}
    <Route path="/users" exact={true} render={() => <Users />} />
    <Route
      path="/users/user/:editId/new_password"
      exact={true}
      render={props => (
        <UserNewPwFormPage {...props} />
      )} />
    <Route
      path="/users/user/:editId/edit"
      exact={true}
      render={props => (
        <UserUpsertFormPage {...props} />
      )} />
    <Route
      path="/users/create"
      exact={true}
      render={props => (
        <UserUpsertFormPage {...props} />
      )} />
    <Route
      path="/users/user/:id"
      exact={true}
      render={props => (
        <User {...props} />
      )} />
  </Switch>
);

export default Routes;