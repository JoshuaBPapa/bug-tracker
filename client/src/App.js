import React, { Suspense, useContext } from 'react';

import Header from './components/Header/Header';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import NotAuthRoutes from './NotAuthRoutes';
import IsAuthRoutes from './IsAuthRoutes';

import { AuthContext } from './AuthContext';

import './style/main.scss';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <div className="App">
      {authContext.isAuth ? <Header /> : null}
      <Suspense fallback={<LoadingSpinner hasExtraMargin={true} />}>
        {authContext.isAuth ? (
          <main>
            <IsAuthRoutes />
          </main>
        ) : (
          <NotAuthRoutes />
        )}
      </Suspense>
    </div>
  );
};

export default App;
