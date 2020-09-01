import React from 'react';
import { Route } from 'react-router-dom';

import Projects from '../components/Pages/Projects/Projects';
import Project from '../components/Pages/Projects/Project';
import ProjectUpsertForm from '../components/Pages/UpsertForms/ProjectUpsertForm';

const ProjectRoutes = () => (
  <>
    <Route path="/projects/project/:editId/edit" exact={true} render={props => (
      <ProjectUpsertForm {...props} />
    )} />
    <Route path="/projects/project/:id" exact={true} render={props => (
      <Project {...props} />
    )} />
    <Route path="/projects/create" exact={true} render={props => (
      <ProjectUpsertForm {...props} />
    )} />
    <Route path="/projects" render={() => (
      <Projects />
    )} />
  </>
);

export default ProjectRoutes;