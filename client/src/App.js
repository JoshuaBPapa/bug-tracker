import React from 'react';
import { Switch } from 'react-router-dom';

import HeaderContainer from './components/Header/HeaderContainer';
import ProjectRoutes from './routes/ProjectRoutes';
import TicketRoutes from './routes/TicketRoutes';

import './style/main.scss';

function App() {
  return (
    <>
      <HeaderContainer />
      <Switch>
        <ProjectRoutes />
        <TicketRoutes />
      </Switch>
    </>
  );
};

export default App;
