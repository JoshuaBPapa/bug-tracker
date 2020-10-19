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
import TicketCommentFormPage from './components/Pages/Tickets/TicketCommentFormPage';
import Tickets from './components/Pages/Tickets/Tickets';
// user pages
import Users from './components/Pages/Users/Users';
import UserNewPwFormPage from './components/Pages/Users/UserNewPwFormPage';
import UserUpsertFormPage from './components/Pages/Users/UserUpsertFormPage';
import User from './components/Pages/Users/User';
import Team from './components/Pages/Team/Team';

const Routes = () => (
  <Switch>
    {/* AUTH ROUTES */}
    {/* login or signup page */}
    <Route path="/login" exact={true} render={() => (
      <LoginSignUp />
    )} />

    {/* PROJECT ROUTES */}
    {/* projects page */}
    <Route path="/projects" exact={true} render={() => <Projects />} />
    {/* edit a project page */}
    <Route
      path="/projects/project/:editId/edit"
      exact={true}
      render={props => (
        <ProjectUpsertFormPage {...props} />
      )} />
    {/* project page */}
    <Route
      path="/projects/project/:id"
      exact={true}
      render={props => (
        <Project {...props} />
      )} />
    {/* create a project page */}
    <Route
      path="/projects/create"
      exact={true}
      render={props => (
        <ProjectUpsertFormPage {...props} />
      )} />

    {/* TICKET ROUTES */}
    {/* tickets page */}
    <Route path="/tickets" exact={true} render={() => <Tickets />} />
    {/* add a comment to a ticket page */}
    <Route
      path="/tickets/ticket/:ticketId/comment"
      exact={true}
      render={props => (
        <TicketCommentFormPage {...props} />
      )} />
    {/* edit a ticket page */}
    <Route
      path="/tickets/ticket/:editId/edit"
      exact={true}
      render={props => (
        <TicketUpsertFormPage {...props} />
      )} />
    {/* create a ticket page */}  
    <Route
      path="/tickets/create/:assignedProjectId"
      exact={true}
      render={props => (
        <TicketUpsertFormPage {...props} />
      )} />
    {/* ticket page */}
    <Route
      path="/tickets/ticket/:id"
      exact={true}
      render={props => (
        <Ticket {...props} />
      )} />

    {/* USER ROUTES */}
    {/* users page */}
    <Route path="/users" exact={true} render={() => <Users />} />
    {/* set a new password for a user page */}
    <Route
      path="/users/user/:editId/new_password"
      exact={true}
      render={props => (
        <UserNewPwFormPage {...props} />
      )} />
    {/* edit a user page */}
    <Route
      path="/users/user/:editId/edit"
      exact={true}
      render={props => (
        <UserUpsertFormPage {...props} />
      )} />
    {/* create a user page */}
    <Route
      path="/users/create"
      exact={true}
      render={props => (
        <UserUpsertFormPage {...props} />
      )} />
    {/* user page */}
    <Route
      path="/users/user/:id"
      exact={true}
      render={props => (
        <User {...props} />
      )} />

    {/* TEAM ROUTES */}
    {/* team page */}
    <Route path="/team" exact={true} render={() => <Team />} />
  </Switch>
);

export default Routes;