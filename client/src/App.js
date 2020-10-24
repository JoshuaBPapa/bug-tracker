import React, { Suspense, useContext } from 'react';

import HeaderContainer from './components/Header/HeaderContainer';
import NotAuthRoutes from './NotAuthRoutes';
import IsAuthRoutes from './IsAuthRoutes';

import { AuthContext } from './AuthContext';

import './style/main.scss';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <div className="App">
      <Suspense fallback={<p>loading...</p>}>
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
