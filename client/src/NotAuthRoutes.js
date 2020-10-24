import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// auth pages
import LoginSignUp from './components/Pages/Auth/LoginSignUp';

const NotAuthRoutes = () => {
  return (
    <Switch>
      {/* AUTH ROUTES */}
      {/* login or signup page */}
      <Route path="/login" exact={true} render={() => (
        <LoginSignUp />
      )} />

      {/* REDIRECT INVALID PATHS TO THE LOGIN PAGE */}
      <Redirect to="/login" />
    </Switch>
  );
};

export default NotAuthRoutes;