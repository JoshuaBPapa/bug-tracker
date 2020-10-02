import React, { useContext } from 'react';

import HeaderContainer from './components/Header/HeaderContainer';
import Routes from './Routes';

import { AuthContext } from './AuthContext';

import './style/main.scss';

function App() {
  const authContext = useContext(AuthContext);
  
  return (
    <div className="App">
      {authContext.isAuth ? <HeaderContainer /> : null}
      <main>
        <Routes />
      </main>
    </div>
  );
};

export default App;
