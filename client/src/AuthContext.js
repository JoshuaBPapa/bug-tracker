import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('access-token') &&
    localStorage.getItem('refresh-token') &&
    localStorage.getItem('userId') ? true : false
  );
  const history = useHistory();

  const handleLogin = () => {
    setIsAuth(true);
    history.push(`/users/user/${localStorage.getItem('userId')}`); 
  };

  const removeAuth = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('userId');
    localStorage.removeItem('authorisation-level');

    setIsAuth(false);
    history.push(`/login`); 
  };

  const handleLogout = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/logout',
      headers: {
        'x-access-token': localStorage.getItem('access-token'),
        'x-refresh-token': localStorage.getItem('refresh-token'),
        'x-userid': localStorage.getItem('userId')
      }
    })
    .then(() => {
      removeAuth();
    })
    .catch(() => {
      removeAuth();
    });
  };

  return (
    <AuthContext.Provider value={{
      isAuth: isAuth,
      handleLogin: handleLogin,
      handleLogout: handleLogout,
      removeAuth: removeAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;