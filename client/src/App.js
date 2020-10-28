import React, { Suspense, useContext } from 'react';

import HeaderContainer from './components/Header/HeaderContainer';
import NotAuthRoutes from './NotAuthRoutes';
import IsAuthRoutes from './IsAuthRoutes';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import { AuthContext } from './AuthContext';

import './style/main.scss';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        {authContext.isAuth ? (
          <>
            <HeaderContainer />
            <main>
              <IsAuthRoutes />
            </main>
          </>
        ) : (
          <NotAuthRoutes />
        )}
      </Suspense>
    </div>
  );
};

export default App;
